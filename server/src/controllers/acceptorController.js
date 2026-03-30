const Acceptor = require('../models/Acceptor');
const asyncHandler = require('../utils/asyncHandler');

const buildAcceptorFilter = ({ q, bloodGroup, city, urgency, status }) => {
  const filter = {};
  if (bloodGroup) {
    filter.bloodGroup = bloodGroup;
  }
  if (city) {
    filter.city = new RegExp(city, 'i');
  }
  if (urgency) {
    filter.urgencyLevel = urgency;
  }
  if (status) {
    filter.status = status;
  }
  if (q) {
    const regex = new RegExp(q, 'i');
    filter.$or = [{ name: regex }, { city: regex }, { hospital: regex }];
  }
  return filter;
};

const getAcceptors = asyncHandler(async (req, res) => {
  const { page = 1, limit = 25 } = req.query;
  const numericLimit = Math.min(parseInt(limit, 10) || 25, 100);
  const skip = (Math.max(parseInt(page, 10) || 1, 1) - 1) * numericLimit;

  const filter = buildAcceptorFilter(req.query);

  const [data, total] = await Promise.all([
    Acceptor.find(filter)
      .sort({ urgencyLevel: -1, createdAt: -1 })
      .skip(skip)
      .limit(numericLimit),
    Acceptor.countDocuments(filter),
  ]);

  res.json({ data, total });
});

const createAcceptor = asyncHandler(async (req, res) => {
  const acceptor = await Acceptor.create(req.body);
  res.status(201).json(acceptor);
});

const updateAcceptor = asyncHandler(async (req, res) => {
  const acceptor = await Acceptor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!acceptor) {
    const error = new Error('Acceptor not found');
    error.status = 404;
    throw error;
  }

  res.json(acceptor);
});

const deleteAcceptor = asyncHandler(async (req, res) => {
  const acceptor = await Acceptor.findByIdAndDelete(req.params.id);
  if (!acceptor) {
    const error = new Error('Acceptor not found');
    error.status = 404;
    throw error;
  }
  res.status(204).send();
});

module.exports = {
  getAcceptors,
  createAcceptor,
  updateAcceptor,
  deleteAcceptor,
};
