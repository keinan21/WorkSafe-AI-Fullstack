const admin = require('firebase-admin');

// Baca dari env, lalu parse teks string-nya menjadi objek JSON asli
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;