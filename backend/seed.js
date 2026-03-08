const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');
    console.log(`📡 Connecting to: ${process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);

    const defaultPassword = 'password123';
    // Use lower cost purely for seed speed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    // ─── Seed Data Definitions ──────────────────────────
    const doctors = [
        {
            email: 'dr.rahul@starortho.com',
            name: 'Dr. Rahul Kalekar',
            specialization: 'Orthopaedic Surgery',
        },
        {
            email: 'dr.aparna@starortho.com',
            name: 'Dr. Aparna Kalekar',
            specialization: 'Paediatrician',
        }
    ];

    const receptionist = {
        email: 'receptionist@clinic.com',
        name: 'Front Desk Admin',
    };

    // ─── Seat Doctors ─────────────────────────────────────
    for (const doc of doctors) {
        const existingDoc = await prisma.doctor.upsert({
            where: { email: doc.email },
            update: {
                name: doc.name,
                specialization: doc.specialization,
                // Don't overwrite password if it already exists, unless explicitly needed
                passwordHash: hashedPassword
            },
            create: {
                name: doc.name,
                email: doc.email,
                passwordHash: hashedPassword,
                specialization: doc.specialization,
            },
        });
        console.log(`✅ Doctor managed: ${doc.email}`);

        // ─── Seat Clinic Settings for this Doctor ───────────
        await prisma.clinicSettings.upsert({
            where: { doctorId: existingDoc.id },
            update: {
                workingDays: [1, 2, 3, 4, 5, 6, 7]
            },
            create: {
                doctorId: existingDoc.id,
                clinicStartTime: '09:00',
                clinicEndTime: '17:00',
                workingDays: [1, 2, 3, 4, 5, 6, 7],
                slotDurationMinutes: 15,
            }
        });
        console.log(`✅ Clinic Settings managed for Dr. ${doc.name}`);
    }

    // ─── Seat Receptionist ───────────────────────────────
    await prisma.receptionist.upsert({
        where: { email: receptionist.email },
        update: {
            name: receptionist.name,
            passwordHash: hashedPassword
        },
        create: {
            name: receptionist.name,
            email: receptionist.email,
            passwordHash: hashedPassword,
        },
    });
    console.log(`✅ Receptionist managed: ${receptionist.email}`);

    console.log('\n🎉 Seeding complete! You can now log in using these credentials.');
}

main()
    .catch((e) => {
        console.error('\n❌ Seeding failed.');
        console.error(e.message);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
