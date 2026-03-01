const http = require('http');

const postData = JSON.stringify({
  email: 'admin@punjablottery.com',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Login Response:', data);
    const response = JSON.parse(data);
    if (response.success) {
      console.log('✅ Admin login successful!');
      console.log('Token:', response.token.substring(0, 50) + '...');
    } else {
      console.log('❌ Admin login failed');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();

console.log('Testing admin login...');
