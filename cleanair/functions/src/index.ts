import functions = require("firebase-functions");
import admin = require("firebase-admin");

admin.initializeApp();

// See: https://github.com/hasura/sample-apps/blob/main/firebase-jwt/functions/index.js
// This triggers whenever a new user is created in Firebase Auth.
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  // Check if user meets role criteria:
  let customClaims;
  // TODO: is this necessary?
  if (user.email && user.email.indexOf("@hasura.io") !== -1) {
    customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "admin",
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-user-id": user.uid,
      },
    };
  } else {
    customClaims = {
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": user.uid,
      },
    };
  }
  // Set custom user claims on this newly created user.
  try {
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    // Update real-time database to notify client to force refresh.
    const metadataRef = admin.database().ref("metadata/" + user.uid);
    return await metadataRef.set({refreshTime: new Date().getTime()});
  } catch (error) {
    console.log(error);
  }
});
