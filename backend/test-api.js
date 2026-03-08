const http = require('http');

async function fetchJSON(url, options) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data);
                }
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
}

async function run() {
    try {
        console.log('Logging in as receptionist...');
        const loginBody = JSON.stringify({ email: 'receptionist@clinic.com', password: 'password123', role: 'RECEPTIONIST' });
        const loginOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(loginBody)
            },
            body: loginBody
        };
        const loginData = await fetchJSON('http://localhost:5000/api/auth/receptionist/login', loginOptions);

        if (!loginData.success) {
            console.error('Login Failed:', loginData);
            return;
        }

        const token = loginData.data.token;
        console.log('Login Success! Token obtained.');

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        console.log(`\nFetching appointments for date: ${formattedDate}`);

        const getOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        const apptData = await fetchJSON(`http://localhost:5000/api/appointments?date=${formattedDate}`, getOptions);
        console.log('API Response Success:', apptData.success);
        console.log('Appointments Returned Length:', apptData.data?.length);
        console.log('Raw Data Array:', JSON.stringify(apptData.data?.slice(0, 1), null, 2));

        // Let's also fetch patient appointments directly
        console.log(`\nFetching ALL appointments (no date filter)...`);
        const allApptData = await fetchJSON(`http://localhost:5000/api/appointments`, getOptions);
        console.log('All Appointments Length:', allApptData.data?.length);

    } catch (err) {
        console.error(err);
    }
}
run();
