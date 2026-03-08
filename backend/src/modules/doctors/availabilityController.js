const availabilityService = require('./availabilityService');
const { catchAsync } = require('../../utils/catchAsync');

exports.getAvailability = catchAsync(async (req, res) => {
    const doctorId = req.user.role === 'DOCTOR' ? req.user.id : req.query.doctorId;
    const availability = await availabilityService.getDoctorAvailability(doctorId);
    res.json({ success: true, data: availability });
});

exports.addAvailability = catchAsync(async (req, res) => {
    const doctorId = req.user.id;
    const availability = await availabilityService.addAvailability(doctorId, req.body);
    res.status(201).json({ success: true, data: availability });
});

exports.removeAvailability = catchAsync(async (req, res) => {
    await availabilityService.removeAvailability(req.params.id);
    res.json({ success: true, message: 'Availability removed' });
});
