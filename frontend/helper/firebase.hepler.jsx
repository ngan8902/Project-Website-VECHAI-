'use strict'

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMcGtLm-Xz5IDkub4wCIFSCQRXE7Keytw",
    authDomain: "vechai-5a3e1.firebaseapp.com",
    projectId: "vechai-5a3e1",
    storageBucket: "vechai-5a3e1.appspot.com",
    messagingSenderId: "912011742702",
    appId: "1:912011742702:web:c8a723fb28fc83d02d52ff"
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