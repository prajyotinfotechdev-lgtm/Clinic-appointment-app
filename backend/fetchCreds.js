const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { PrismaClient } = require('@prisma/client');

console.log('Connecting to:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function fetchCreds() {
    const doctors = await prisma.doctor.findMany({ select: { id: true, name: true, email: true } });
    const receptionists = await prisma.receptionist.findMany({ select: { id: true, name: true, email: true } });

    console.log('--- DOCTORS ---');
    console.table(doctors);

    console.log('\n--- RECEPTIONISTS ---');
    console.table(receptionists);
}

fetchCreds()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
