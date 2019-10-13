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
    const imageData64 = req.body.image;
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
    const image = new Image();
    image.src = imageData64;
    const storageRef = admin.storage().bucket("gs://propogate-media-bucket/").ref();
    const imageRef = storageRef.child('/' + postID);
    // eslint-disable-next-line promise/catch-or-return
    imageRef.put(b64toBlob(imageData64));

    // Update the database reference to point to our newly updated image
    const dbEntryRef = dbRef.child("/media/" + postID);
    dbEntryRef.update({
        media_ref: storageRef.path + "/" + postID
    })
});

function b64toBlob(dataURI) {

    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/jpeg'});
}