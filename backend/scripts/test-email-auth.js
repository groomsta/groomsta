// Test Email/Password Auth Flow
async function testEmailAuth() {
    const baseUrl = 'http://localhost:3000';
    const email = `test-${Date.now()}@example.com`;
    const password = 'securePassword123';
    const phone = `9${Date.now().toString().slice(-9)}`; // Unique phone

    console.log(`\n--- Starting Email Auth Test ---`);
    console.log(`User: ${email}`);

    // 1. Register
    console.log('\n1. Testing Registration...');
    const regRes = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, phone, full_name: 'Test User' })
    });
    const regData = await regRes.json();
    console.log('Register Response:', regData);

    if (!regData.success) {
        console.error('Registration failed!');
        return;
    }

    // 2. Login
    console.log('\n2. Testing Email Login...');
    const loginRes = await fetch(`${baseUrl}/auth/login/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginData);

    if (loginData.success && loginData.accessToken) {
        console.log('\nSUCCESS: Email/Password Flow Verified! ✅');
    } else {
        console.error('\nFAILURE: Login failed! ❌');
        console.log(loginData);
    }
}

testEmailAuth().catch(console.error);
