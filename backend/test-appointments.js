require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Fetching latest appointment...');
    const appts = await prisma.appointment.findMany({
        orderBy: { createdAt: 'desc' },
        take: 3,
        include: { patient: true }
    });
    appts.forEach(a => {
        console.log(`ID: ${a.id}`);
        console.log(`Patient: ${a.patient.name}`);
        console.log(`Date stored: ${a.appointmentDate.toISOString()}`);
        console.log(`Date fetched local: ${a.appointmentDate.toString()}`);
        console.log('---');
    });
}

main().finally(() => prisma.$disconnect());
