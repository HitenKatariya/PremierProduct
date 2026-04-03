/**
 * Quick Admin Token Fix Script
 * 
 * To use this script:
 * 1. Open the admin login page in your browser
 * 2. Open browser developer tools (F12)
 * 3. Go to the Console tab
 * 4. Copy and paste this entire script
 * 5. Press Enter to run it
 * 6. Navigate to the admin dashboard
 */

// Clear any existing expired tokens (sessionStorage-based)
sessionStorage.removeItem('adminToken');
sessionStorage.removeItem('adminUser');

// Set the fresh admin token (valid for 24 hours)
const freshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2ZjMGM2ZDYwMTRmZDNhYzMxMWY1YiIsImVtYWlsIjoia2FscGVzaGJoYWlAZ21haWwuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzU4NjE3MjE5LCJleHAiOjE3NTg3MDM2MTl9.UUYaLOuYgVr3PZ4fMK00lbvhB5kYsNkhe4KDfn7HANI';

// Set the admin user data
const adminUser = {
  id: '68cfc0c6d6014fd3ac311f5b',
  name: 'Kalpesh Bhai',
  email: 'kalpeshbhai@gmail.com',
  role: 'superadmin'
};

// Store in sessionStorage
sessionStorage.setItem('adminToken', freshToken);
sessionStorage.setItem('adminUser', JSON.stringify(adminUser));

console.log('✅ Admin token has been renewed successfully!');
console.log('📧 Admin email: kalpeshbhai@gmail.com');
console.log('👑 Role: superadmin');
console.log('⏰ Token expires in: 24 hours');
console.log('🔄 You can now navigate to /admin/dashboard or refresh the page');

// Optionally redirect to admin dashboard
// window.location.href = '/admin/dashboard';