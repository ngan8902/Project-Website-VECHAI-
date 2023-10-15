'use strict'

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAm2wp-9g9B514AdDEFcp3Nwjd2Pp8G6O8",
    authDomain: "vechai-firebase-upload.firebaseapp.com",
    projectId: "vechai-firebase-upload",
    storageBucket: "vechai-firebase-upload.appspot.com",
    messagingSenderId: "398323844807",
    appId: "1:398323844807:web:2d287dd31c0d41b64260e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

class FireBaseHelper {
    static uploadFileToStorage = async (file) => {
        const time = Date.now();
        const imageRef = ref(storage, `images/${time + file.name}`);
        const snapshot = await uploadBytes(imageRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
    };
}

module.exports = FireBaseHelper