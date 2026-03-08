const { signToken } = require('./src/utils/jwt');
const prisma = require('./src/config/database');

async function test() {
    const patient = await prisma.patient.findFirst();
    if (!patient) {
        console.log('No patient found');
        return;
    }
    const token = signToken({ userId: patient.id, role: 'PATIENT', email: patient.email });
    console.log('Token:', token);
}
test();
