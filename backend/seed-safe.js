const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting safe database seed...');
    console.log(`📡 Connecting to: ${process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);

    const defaultPassword = 'password123';
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

    try {
        // ─── Create Doctors ─────────────────────────────────────
        for (const doc of doctors) {
            try {
                const existingDoc = await prisma.doctor.findUnique({
                    where: { email: doc.email }
                });

                if (!existingDoc) {
                    const newDoc = await prisma.doctor.create({
                        data: {
                            name: doc.name,
                            email: doc.email,
                            passwordHash: hashedPassword,
                            specialization: doc.specialization,
                        },
                    });
                    console.log(`✅ Doctor created: ${doc.email}`);

                    // ─── Create Clinic Settings for this Doctor ───────────
                    await prisma.clinicSettings.create({
                        data: {
                            doctorId: newDoc.id,
                            clinicStartTime: '09:00',
                            clinicEndTime: '17:00',
                            workingDays: [1, 2, 3, 4, 5, 6, 7],
                            slotDurationMinutes: 15,
                        }
                    });
                    console.log(`✅ Clinic Settings created for Dr. ${doc.name}`);
                } else {
                    console.log(`✅ Doctor already exists: ${doc.email}`);
                }
            } catch (error) {
                console.error(`❌ Error with doctor ${doc.email}:`, error.message);
            }
        }

        // ─── Create Receptionist ───────────────────────────────
        try {
            const existingReceptionist = await prisma.receptionist.findUnique({
                where: { email: receptionist.email }
            });

            if (!existingReceptionist) {
                await prisma.receptionist.create({
                    data: {
                        name: receptionist.name,
                        email: receptionist.email,
                        passwordHash: hashedPassword,
                    },
                });
                console.log(`✅ Receptionist created: ${receptionist.email}`);
            } else {
                console.log(`✅ Receptionist already exists: ${receptionist.email}`);
            }
        } catch (error) {
            console.error(`❌ Error with receptionist:`, error.message);
        }

        console.log('\n🎉 Safe seeding complete!');
        console.log('\n📋 Login Credentials:');
        console.log('👨‍⚕️ Dr. Rahul: dr.rahul@starortho.com / password123');
        console.log('👩‍⚕️ Dr. Aparna: dr.aparna@starortho.com / password123');
        console.log('📋 Receptionist: receptionist@clinic.com / password123');

    } catch (error) {
        console.error('\n❌ Seeding failed:', error.message);
        throw error;
    }
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
