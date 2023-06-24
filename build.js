const fs = require('fs');
const secret = require('./secret.json');

const firebaseConfig = {
    apiKey: secret.API_KEY,
    authDomain: secret.AUTH_DOMAIN,
    projectId: secret.PROJECT_ID,
    storageBucket: secret.STORAGE_BUCKET,
    messagingSenderId: secret.MESSAGING_SENDER_ID,
    appId: secret.APP_ID,
    measurementId: secret.MEASUREMENT_ID
};

const firebaseConfigString = JSON.stringify(firebaseConfig, null, 2);

fs.writeFileSync('firebaseConfig.js', `const firebaseConfig = ${firebaseConfigString};\n\nexport default firebaseConfig;\n`);
