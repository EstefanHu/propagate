const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
    admin.initializeApp(functions.config().firebase);
// eslint-disable-next-line no-empty
} catch (e) {
} // You do that because the admin SDK can only be initialized once.

/**
 * Create a media db entry and upload a photo on a POST request
 */
exports.uploadPhoto = functions.https.onRequest((req, res) => {
    const photo = req.body.photo;
    const unixTime = req.body.unixTime;
    const lat = req.body.lat;
    const long = req.body.long;

    // Save initial database entry
    const db = admin.database();
    const dbRef = db.ref("/media");
    const newPostRef = dbRef.push({
        event_id: null,
        lat: lat,
        long: long,
        timestamp: unixTime,
        media_ref: null,
        data_ref: null
    });
    const postID = newPostRef.key;

    // Upload image
    const storageRef = admin.storage().bucket("gs://propogate-media-bucket/").ref();
    const imageRef = storageRef.child('/' + postID);
    // eslint-disable-next-line promise/catch-or-return
    imageRef.put(photo);


    // TODO: CHANGE REFERNCE IF FILE TYPE CHANGES
    // Update the database reference to point to our newly updated image
    const dbEntryRef = dbRef.child("/media/" + postID);
    dbEntryRef.update({
        media_ref: storageRef.path + "/" + postID
    })
});