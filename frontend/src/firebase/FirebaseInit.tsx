import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, onAuthStateChanged, updateProfile } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

class Firebase {
    auth: any;
    db: any;
    user: any | null;

    constructor() {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
        this.db = getDatabase(app);
        this.user = null;
        this.initAuthStateListener();
    }

    initAuthStateListener() {
        // Listen for auth state changes
        onAuthStateChanged(this.auth, user => {
            this.user = user;
        });
    }

    async registerUser(email: string, password: string, name: string) {
        try {
            await setPersistence(this.auth, browserSessionPersistence);
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            const dbRef = ref(this.db, `users/${user.uid}`);
            await set(dbRef, {
                email: user.email,
                name: name,
                problems: []
            });
        } catch (error) {
            console.error('An error occurred during sign up:', error);
        }
    }

    async loginUser(email: string, password: string) {
        try {
            await setPersistence(this.auth, browserSessionPersistence);
            await signInWithEmailAndPassword(this.auth, email, password);
        } catch (error) {
            let error_message = (error as any).message;
            let errorCode = error_message.split("(")[1]?.split(")")[0];
            if (errorCode === 'auth/invalid-email') {
                alert('Invalid email');
            }
            else if (errorCode === 'auth/user-not-found') {
                alert('User not found');
            } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-password') {
                alert('Wrong password');
            } else if (errorCode === 'auth/invalid-credential') {
                alert(`Invalid credentials! \n${error_message}`);
            } else if (errorCode === 'auth/too-many-requests') {
                alert(`Too many requests: You need to reset your password to login again! \n ${error_message}`);
            } else {
                // Generic error handler
                console.error('An error occurred during sign in:', error);
            }
        }
    }

    async getProblems() {
        try {
          const dbRef = ref(this.db, 'problems');
          const snapshot = await get(dbRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            return data;
          } else {
            console.log("No data available");
            return null;
          }
        } catch (error) {
          console.error(error);
          throw error; // Rethrow the error to handle it in the caller
        }
      }
      
}

const FirebaseInit = new Firebase();

export default FirebaseInit;
