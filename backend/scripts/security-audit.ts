import axios from 'axios';

const BASER_URL = 'http://localhost:5000';

const runSecurityAudit = async () => {
    console.log('🔒 Starting Security Audit...');

    try {
        // 1. Check HTTP Headers (Helmet)
        console.log('1. Checking Security Headers...');
        const res = await axios.get(BASER_URL);
        const headers = res.headers;

        if (headers['x-dns-prefetch-control'] === 'off' && headers['x-frame-options'] === 'SAMEORIGIN') {
            console.log('   ✅ Helmet Headers Detected');
        } else {
            console.log('   ❌ Missing Security Headers (Check Helmet config)');
        }

        // 2. SQL Injection Check (Basic)
        console.log('2. Testing SQL Injection Vulnerability...');
        try {
            await axios.post(`${BASER_URL}/auth/login`, {
                phone: "' OR '1'='1"
            });
            console.log('   ⚠️ API Accepted SQL Injection payload (investigate manually)');
        } catch (e: any) {
            if (e.response && e.response.status === 400) {
                console.log('   ✅ API Rejected Malformed Input (Zod Validation Active)');
            }
        }

        // 3. Information Disclosure
        console.log('3. Checking Information Disclosure...');
        if (headers['x-powered-by']) {
            console.log(`   ❌ Server leaking 'X-Powered-By': ${headers['x-powered-by']}`);
        } else {
            console.log('   ✅ Server banner hidden');
        }

        console.log('\n🏁 Audit Complete.');

    } catch (error) {
        console.error('Audit Failed (Server offline?):', error);
    }
};

runSecurityAudit();
