// src/firebase/upload.js
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig";

const UploadFile = async (path, file, name, meta = {}, progressCallback) => {
  if (file && path && name) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `${path}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file, meta);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progressCallback) {
            progressCallback(progress);
          }
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } else {
    throw new Error("File, path, and name are required");
  }
};

export { UploadFile };
