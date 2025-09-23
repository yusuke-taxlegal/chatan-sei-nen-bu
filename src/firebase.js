    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from "firebase/storage";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // ここに、ステップ2でコピーしたfirebaseConfigの中身を貼り付けます
    const firebaseConfig = {
        apiKey: "AIzaSyCTRU2kOJGOFchiW0-hRmMfQRJQUAChb10",
        authDomain: "chatan-members-site.firebaseapp.com",
        projectId: "chatan-members-site",
        storageBucket: "chatan-members-site.firebasestorage.app",
        messagingSenderId: "1024502175390",
        appId: "1:1024502175390:web:0f79130f64007cff0e4d8f",
        measurementId: "G-QDDSG76947"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // 認証機能の初期化
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    export const storage = getStorage(app);