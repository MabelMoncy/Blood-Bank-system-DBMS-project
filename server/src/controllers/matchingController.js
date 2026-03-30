const Donor = require('../models/Donor');
const Acceptor = require('../models/Acceptor');
const asyncHandler = require('../utils/asyncHandler');
const { getCompatibleGroups } = require('../utils/constants');

const buildMatchPayload = (donor, acceptor, preferExact) => {
  const exact = donor.bloodGroup === acceptor.bloodGroup;
  return {
    donor: {
      id: donor._id,
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      city: donor.city,
      phone: donor.phone,
    },
    acceptor: {
      id: acceptor._id,
      name: acceptor.name,
      bloodGroup: acceptor.bloodGroup,
      city: acceptor.city,
      phone: acceptor.phone,
      urgencyLevel: acceptor.urgencyLevel,
    },
    compatibility: preferExact ? 'exact' : exact ? 'exact' : 'compatible',
  };
};

const getMatches = asyncHandler(async (req, res) => {
  const preferExact = req.query.preferExact === 'true';
  const cityFilter = req.query.city;

  const donorQuery = { availabilityStatus: 'available' };
  if (cityFilter) {
    donorQuery.city = new RegExp(cityFilter, 'i');
  }

  const acceptorQuery = { status: 'waiting' };
  if (cityFilter) {
    acceptorQuery.city = new RegExp(cityFilter, 'i');
  }

  const [donors, acceptors] = await Promise.all([
    Donor.find(donorQuery).sort({ lastDonationAt: 1, createdAt: -1 }),
    Acceptor.find(acceptorQuery).sort({ urgencyLevel: -1, createdAt: 1 }),
  ]);

  const usedDonors = new Set();
  const matches = [];

  acceptors.forEach((acceptor) => {
    const allowedGroups = getCompatibleGroups(acceptor.bloodGroup, preferExact);
    const donor = donors.find(
      (candidate) => !usedDonors.has(candidate.id) && allowedGroups.includes(candidate.bloodGroup)
    );

    if (donor) {
      usedDonors.add(donor.id);
      matches.push(buildMatchPayload(donor, acceptor, preferExact));
    }
  });

  res.json({ total: matches.length, matches });
});

module.exports = {
  getMatches,
};
