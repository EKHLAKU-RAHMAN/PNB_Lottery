const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAdminLogin() {
  console.log('🔧 Testing Admin Login System\n');

  try {
    // Test 1: Create default admin
    console.log('1️⃣ Creating default admin...');
    try {
      const createResponse = await axios.post(`${API_BASE}/admin/create-default`);
      console.log('✅ Admin creation response:', createResponse.data);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('ℹ️ Admin already exists');
      } else {
        console.log('❌ Admin creation error:', error.response?.data);
      }
    }

    // Test 2: Login with correct credentials
    console.log('\n2️⃣ Testing login with correct credentials...');
    try {
      const loginData = {
        email: 'admin@punjablottery.com',
        password: 'admin123'
      };
      
      const loginResponse = await axios.post(`${API_BASE}/admin/login`, loginData);
      console.log('✅ Login successful!');
      console.log('📋 Token received:', loginResponse.data.token ? 'Yes' : 'No');
      console.log('👤 Admin data:', loginResponse.data.admin);
      
      // Test 3: Use token for protected route
      console.log('\n3️⃣ Testing protected route with token...');
      const token = loginResponse.data.token;
      const headers = { Authorization: `Bearer ${token}` };
      
      const ticketsResponse = await axios.get(`${API_BASE}/tickets`, { headers });
      console.log('✅ Protected route access successful');
      console.log('📄 Tickets data:', ticketsResponse.data.success ? 'Success' : 'Failed');
      
    } catch (error) {
      console.log('❌ Login failed:', error.response?.data);
    }

    // Test 4: Login with wrong password
    console.log('\n4️⃣ Testing login with wrong password...');
    try {
      const wrongLoginData = {
        email: 'admin@punjablottery.com',
        password: 'wrongpassword'
      };
      
      await axios.post(`${API_BASE}/admin/login`, wrongLoginData);
      console.log('❌ Should have failed!');
    } catch (error) {
      console.log('✅ Correctly rejected wrong password');
    }

    // Test 5: Login with wrong email
    console.log('\n5️⃣ Testing login with wrong email...');
    try {
      const wrongEmailData = {
        email: 'wrong@email.com',
        password: 'admin123'
      };
      
      await axios.post(`${API_BASE}/admin/login`, wrongEmailData);
      console.log('❌ Should have failed!');
    } catch (error) {
      console.log('✅ Correctly rejected wrong email');
    }

    console.log('\n🎉 Admin login system test completed!');

  } catch (error) {
    console.error('💥 Test error:', error.message);
  }
}

// Run tests
testAdminLogin();
