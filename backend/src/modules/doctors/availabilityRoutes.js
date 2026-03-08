const express = require('express');
const availabilityController = require('./availabilityController');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = express.Router();

router.use(authenticate);

router.route('/')
    .get(availabilityController.getAvailability)
    .post(authorize('DOCTOR'), availabilityController.addAvailability);

router.route('/:id')
    .delete(authorize('DOCTOR'), availabilityController.removeAvailability);

module.exports = router;
