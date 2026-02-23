// Configuration for admin emails
// Add emails here that should automatically get admin role
const ADMIN_EMAILS = [
  'samaksh.arora@wayne.edu',
   // Add your email here
     // Add more admin emails as needed
];

// Function to check if an email should have admin role
const isAdminEmail = (email) => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

// Function to get the appropriate role for an email
const getRoleForEmail = (email) => {
  return isAdminEmail(email) ? 'admin' : 'member';
};

module.exports = {
  ADMIN_EMAILS,
  isAdminEmail,
  getRoleForEmail
};