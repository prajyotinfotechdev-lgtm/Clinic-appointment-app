const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.appointment.count();
    const recent = await prisma.appointment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
    });
    console.log('Total Appointments:', count);
    console.log('Recent Appointments:', JSON.stringify(recent, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
