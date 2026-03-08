const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting Debug Seed...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const doctors = [
        { email: 'dr.rahul@starortho.com', name: 'Dr. Rahul Kalekar', specialization: 'Orthopaedic Surgery' },
        { email: 'dr.aparna@starortho.com', name: 'Dr. Aparna Kalekar', specialization: 'Paediatrician' }
    ];

    for (const doc of doctors) {
        console.log(`🔍 Processing doctor: ${doc.email}`);
        try {
            const existingDoc = await prisma.doctor.upsert({
                where: { email: doc.email },
                update: { name: doc.name, specialization: doc.specialization, passwordHash: hashedPassword },
                create: { name: doc.name, email: doc.email, passwordHash: hashedPassword, specialization: doc.specialization }
            });
            console.log(`✅ Doctor upserted: ${existingDoc.id}`);

            const settings = await prisma.clinicSettings.upsert({
                where: { doctorId: existingDoc.id },
                update: {},
                create: {
                    doctorId: existingDoc.id,
                    clinicStartTime: '09:00',
                    clinicEndTime: '17:00',
                    slotDurationMinutes: 15
                }
            });
            console.log(`✅ Settings upserted for: ${existingDoc.id}`);
        } catch (err) {
            console.error(`❌ Error for ${doc.email}:`, err.message);
        }
    }
    console.log('🏁 Debug Seed Finished');
}

main().finally(() => prisma.$disconnect());
