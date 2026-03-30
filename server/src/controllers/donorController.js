const Donor = require('../models/Donor');
const asyncHandler = require('../utils/asyncHandler');

const buildDonorFilter = ({ q, bloodGroup, city, status }) => {
  const filter = {};
  if (bloodGroup) {
    filter.bloodGroup = bloodGroup;
  }
  if (city) {
    filter.city = new RegExp(city, 'i');
  }
  if (status) {
    filter.availabilityStatus = status;
  }
  if (q) {
    const regex = new RegExp(q, 'i');
    filter.$or = [{ name: regex }, { city: regex }, { email: regex }];
  }
  return filter;
};

const getDonors = asyncHandler(async (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  const numericLimit = Math.min(parseInt(limit, 10) || 25, 100);
  const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * numericLimit;

  const filter = buildDonorFilter(req.query);

  const [data, total] = await Promise.all([
    Donor.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(numericLimit),
    Donor.countDocuments(filter),
  ]);

  res.json({ data, total });
});

const createDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.create(req.body);
  res.status(201).json(donor);
});

const updateDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!donor) {
    const error = new Error('Donor not found');
    error.status = 404;
    throw error;
  }

  res.json(donor);
});

const deleteDonor = asyncHandler(async (req, res) => {
  const donor = await Donor.findByIdAndDelete(req.params.id);
  if (!donor) {
    const error = new Error('Donor not found');
    error.status = 404;
    throw error;
  }
  res.status(204).send();
});

module.exports = {
  getDonors,
  createDonor,
  updateDonor,
  deleteDonor,
};
