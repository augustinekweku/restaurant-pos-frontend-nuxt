// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as firebaseRef,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
  getMetadata,
  StorageError,
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgdVz49UfQVr4bQu0v4S6TaFlhHMCBBNQ",
  authDomain: "restaurant-pos-397516.firebaseapp.com",
  projectId: "restaurant-pos-397516",
  storageBucket: "restaurant-pos-397516.appspot.com",
  messagingSenderId: "343515212240",
  appId: "1:343515212240:web:4479c22caee84f366c71d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const saveFile = async (path: string, file: any) => {
  const uploadProgress = ref(0);
  const uploadError = ref(null);
  const downloadUrl = ref("");
  // Create a root reference to the firebase storage
  const storageRef = firebaseRef(storage, path);
  // const snapshot = await uploadString(storageRef, file, "data_url");

  // if (snapshot) {
  //   const url = await getDownloadURL(snapshot.ref);
  //   const metadata = await getMetadata(storageRef);
  //   return { snapshot, url, metadata };
  // }

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // console.log(snapshot.bytesTransferred, snapshot.totalBytes);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploadProgress.value = progress;

      // console.log("Upload is " + uploadProgress.value + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error: any) => {
      // Handle unsuccessful uploads
      uploadError.value = error;
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        downloadUrl.value = downloadURL;
      });
    }
  );
  return { downloadUrl, uploadProgress, uploadError };
};

//we will use this if we want to convert the file to base64 string before uploading
export const uploadFile = async (file: File, pathName: string) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      //we would use this to upload the file to firebase if we wanted to use the base64 string
      const result = reader.result;
      // console.log(result);
      // if (snapshot) {
      //   resolve({ snapshot, url, metadata });
      // } else {
      //   reject("Error");
      // }
    };
  });
};
