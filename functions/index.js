/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {onCall} = require("firebase-functions/v1/https");
const admin = require("firebase-admin");
const {HttpsError} = require("firebase-functions/v2/https");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getNames = onCall((data, context) => {
  logger.info("Call for Names", {structuredData: true});
  const ref = admin.firestore().collection("names").doc("names");
  return ref.get().then((doc) => {
    return {unique: !doc.exists};
  }).catch((err) => {
    throw new HttpsError("unknown", err.message, err);
  });
});
