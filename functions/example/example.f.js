const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
    admin.initializeApp(functions.config().firebase);
// eslint-disable-next-line no-empty
} catch (e) {
} // You do that because the admin SDK can only be initialized once.
// my imports ...

/**
 *  Blur offensive images uploaded on Cloud Storage.
 */
// exports = module.exports = functions.storage.object().onChange(event => {
//     // Function's code...
// });