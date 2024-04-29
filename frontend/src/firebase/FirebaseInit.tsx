import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, deleteUser, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, get, update, remove } from "firebase/database";

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
    }

    // I want when user sign up, a user profile should be created with a uid under the users node
    registerUser(email: string, password: string, name: string) {
        setPersistence(this.auth, browserSessionPersistence).then(async () => {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            console.log(userCredential)
            const user = userCredential.user;
            console.log(user)
            updateProfile(user, {
                displayName: name
            }).then(() => {
                const dbRef = ref(this.db, `users/${user.uid}`);
                set(dbRef, {
                    email: user.email,
                    name: name,
                    problems: []
                });
            });
        });
    }

    async loginUser(email: string, password: string) {
        try {
            await setPersistence(this.auth, browserSessionPersistence).then(async () => {
                console.log(email, password);
                const UserCredential = signInWithEmailAndPassword(this.auth, email, password);
                this.auth.onAuthStateChanged(async () => {
                    if ((await UserCredential).user) {
                        this.user = (await UserCredential).user;
                        console.log('User is logged in:', this.user);
                    }
                }
                );
            })
            .catch((error) => {
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
            });
        } catch (error) {
            console.error('An error occurred during sign in:', error);
        }
    }

    isLoggedIn() {
        if (this.user) {
            return this.user;
        } else {
            return false;
        }
    }
}

const FirebaseInit = new Firebase();

export default FirebaseInit;