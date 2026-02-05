import admin from "firebase-admin";
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "realtimeemployeetaskmanagement.appspot.com",
});

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export const auth = admin.auth();