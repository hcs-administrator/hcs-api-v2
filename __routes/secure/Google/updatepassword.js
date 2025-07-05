require('dotenv').config()

const express = require('express')
const { verify } = require("../../../__functions/verify")

const router = express()

const bodyParser = require('body-parser')
router.use(bodyParser.json());

const { google } = require('googleapis');
const path = require('path');

// Initialize the Google Admin SDK
async function initializeAdminSDK() {
  // Load service account credentials
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'service-account-key.json'), // Path to your service account key
    scopes: [
    'https://www.googleapis.com/auth/admin.directory.user',
    'https://www.googleapis.com/auth/admin.directory.user.security'
    ],
    clientOptions : {
      subject: 'super_admin@hamiltonchristian.school.nz'
    }
  });

  const authClient = await auth.getClient();
  const admin = google.admin({ version: 'directory_v1', auth: authClient });

  return admin;
}

// Update user password
async function updateUserPassword(userEmail, newPassword) {
  try {
    const admin = await initializeAdminSDK();

    const response = await admin.users.update({
      userKey: userEmail, // Can be email or user ID
      requestBody: {
        password: newPassword,
        changePasswordAtNextLogin: false // Set to true if you want user to change password on next login
      }
    });

    console.log('Password updated successfully:', response.data);
    return response.data;

  } catch (error) {

    console.error('Error updating password:', error.message);

    throw error;


  }
}

async function main(user, pass) {

  try {

    await updateUserPassword(user, pass);
    console.log("\n\n\n")   

  } catch (error) {
    console.error('Failed to update password:', error);
    console.log("\n\n\n\n\n\n\n\n\n")
  }
}

router.post('/update-password', verify, async (req, res) => {

    if ( req.statusCode === 200 ) {    
        if (res.locals.sub.AppRole === "User" || res.locals.sub.AppRole === "Super_Admin" || res.locals.sub.AppRole === "Admin") {

            try {

                await main(`${req.body.data.eid}`, req.body.data.pass)

                res.status(200).json({"MSG" : "User Updated"})
            } catch(e) {
                console.log(e)
                res.status(400).json({"MSG" : e})
            }

        }
    }

})

module.exports = router

// Run example if this file is executed directly
if (require.main === module) {
  main();
}