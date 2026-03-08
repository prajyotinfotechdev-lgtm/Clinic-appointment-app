const { signToken } = require('./src/utils/jwt');
const prisma = require('./src/config/database');

async function test() {
    const patient = await prisma.patient.findFirst();
    const doctor = await prisma.doctor.findFirst();

    if (!patient || !doctor) {
        console.log('Missing data');
        return;
    }

    const token = signToken({ userId: patient.id, role: 'PATIENT', email: patient.email });

    const url = `http://localhost:5000/api/appointments/slots?doctorId=${doctor.id}&date=2026-03-09`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const status = response.status;
    const body = await response.text();

    console.log('Status:', status);
    console.log('Body:', body);
}
test();
