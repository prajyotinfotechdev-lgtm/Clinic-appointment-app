require('dotenv').config();
const db = require('./src/config/database');
const service = require('./src/modules/appointments/service');

async function run() {
    try {
        const doctors = await db.doctor.findMany();
        if (!doctors.length) return console.log('No doctors found');
        const doctorId = doctors[0].id;
        console.log('Testing slots for doctor:', doctorId);

        const date = new Date('2026-03-10'); // Future date
        const slots = await service.getAvailableSlots(doctorId, date);
        console.log('Slots:', slots);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await db.$disconnect();
    }
}
run();
