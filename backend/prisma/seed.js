const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with default users...');

    // Hash passwords statically to 'password123'
    const passwordHash = await bcrypt.hash('password123', 10);

    // 1. Create a Default Clinic
    const clinic = await prisma.clinic.upsert({
        where: { id: 'default-clinic-1' },
        update: {},
        create: {
            id: 'default-clinic-1',
            name: 'Star Ortho & Women Care',
            address: 'Sanskruti Arcade, Ground Floor, Shop 6, Wakad, Pune'
        }
    });

    console.log(`✅ Clinic created: ${clinic.name}`);

    // 2. Create Receptionist
    const receptionist = await prisma.receptionist.upsert({
        where: { email: 'reception@starortho.com' },
        update: { passwordHash },
        create: {
            name: 'Front Desk Admin',
            email: 'reception@starortho.com',
            passwordHash
        }
    });
    console.log(`✅ Receptionist created: ${receptionist.email}`);

    // 3. Create Doctors
    const drRahul = await prisma.doctor.upsert({
        where: { email: 'dr.rahul@starortho.com' },
        update: { passwordHash, clinicId: clinic.id },
        create: {
            id: 'dr-rahul',
            name: 'Dr. Rahul Kalekar',
            email: 'dr.rahul@starortho.com',
            specialization: 'Orthopaedic Surgery',
            passwordHash,
            clinicId: clinic.id
        }
    });

    const drAparna = await prisma.doctor.upsert({
        where: { email: 'dr.aparna@starortho.com' },
        update: { passwordHash, clinicId: clinic.id },
        create: {
            id: 'dr-aparna',
            name: 'Dr. Aparna Kalekar',
            email: 'dr.aparna@starortho.com',
            specialization: 'Obstetrics & Gynaecology',
            passwordHash,
            clinicId: clinic.id
        }
    });

    console.log(`✅ Doctors created: ${drRahul.email}, ${drAparna.email}`);

    // Create default schedule settings
    await prisma.clinicSettings.upsert({
        where: { doctorId: drRahul.id },
        update: {},
        create: {
            doctorId: drRahul.id,
            clinicStartTime: '10:00',
            clinicEndTime: '20:00',
            slotDurationMinutes: 15
        }
    });

    await prisma.clinicSettings.upsert({
        where: { doctorId: drAparna.id },
        update: {},
        create: {
            doctorId: drAparna.id,
            clinicStartTime: '10:00',
            clinicEndTime: '18:00',
            slotDurationMinutes: 20
        }
    });

    console.log('🎉 Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
