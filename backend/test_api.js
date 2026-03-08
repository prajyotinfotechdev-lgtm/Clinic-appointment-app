const doctorRepository = require('./src/modules/doctors/repository');
async function test() {
    console.log('🧪 Testing DoctorRepository.findAll()');
    try {
        const doctors = await doctorRepository.findAll();
        console.log('Result:', JSON.stringify(doctors, null, 2));
    } catch (err) {
        console.error('Error:', err);
    }
}
test();
