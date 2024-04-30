import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
            console.log('Init User:', this.user);
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
            console.error('An error occurred during sign in:', error);
        }
    }

    isLoggedIn() {
        console.log('Check Login:', this.user);
        return !!this.user;
    }
}

const FirebaseInit = new Firebase();

export default FirebaseInit;
