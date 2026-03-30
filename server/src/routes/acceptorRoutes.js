const express = require('express');
const { getAcceptors, createAcceptor, updateAcceptor, deleteAcceptor } = require('../controllers/acceptorController');

const router = express.Router();

router.route('/').get(getAcceptors).post(createAcceptor);
router.route('/:id').patch(updateAcceptor).delete(deleteAcceptor);

module.exports = router;
