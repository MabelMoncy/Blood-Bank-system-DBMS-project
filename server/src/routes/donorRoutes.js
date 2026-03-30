const express = require('express');
const { getDonors, createDonor, updateDonor, deleteDonor } = require('../controllers/donorController');

const router = express.Router();

router.route('/').get(getDonors).post(createDonor);
router.route('/:id').patch(updateDonor).delete(deleteDonor);

module.exports = router;
