import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCPnAKqTl9q4LGeWzVRH1HWuI6r01Rc2V0",
    authDomain: "image-blog-dbb1d.firebaseapp.com",
    projectId: "image-blog-dbb1d",
    storageBucket: "image-blog-dbb1d.appspot.com",
    messagingSenderId: "684664316521",
    appId: "1:684664316521:web:1f83b44e285d321c4038f8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)