const Donor = require('../models/Donor');
const Acceptor = require('../models/Acceptor');
const asyncHandler = require('../utils/asyncHandler');

const getStats = asyncHandler(async (_req, res) => {
  const [donorCount, acceptorCount, availableDonors, waitingAcceptors, donorByGroup, recentDonors, recentAcceptors] =
    await Promise.all([
      Donor.countDocuments(),
      Acceptor.countDocuments(),
      Donor.countDocuments({ availabilityStatus: 'available' }),
      Acceptor.countDocuments({ status: 'waiting' }),
      Donor.aggregate([
        { $group: { _id: '$bloodGroup', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Donor.find().sort({ createdAt: -1 }).limit(5),
      Acceptor.find().sort({ createdAt: -1 }).limit(5),
    ]);

  res.json({
    donorCount,
    acceptorCount,
    availableDonors,
    waitingAcceptors,
    donorByGroup,
    recentDonors,
    recentAcceptors,
  });
});

module.exports = {
  getStats,
};
