import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from "firebase/auth";
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
        this.user = null as any;
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
                problems: {}
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
                alert("Invalid credentials!");
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
          throw error; 
        }
      }

    async logout() {
        try {
            await this.auth.signOut();
        } catch (error) {
            console.error('An error occurred during sign out:', error);
        }
    }

    async resetPassword(email: string) {
        try {
            await sendPasswordResetEmail(this.auth, email);
        } catch (error) {
            console.error('An error occurred during password reset:', error);
        }
    }

    async getUserProblems() {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUserProblems(problems: any) {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list`);
            await set(dbRef, problems);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserSubmittedCode(problem_no: string) {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems/${problem_no}/input`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUserAttempts(problem_no: String) {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list/${problem_no}/attempts`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const previousAttempts = snapshot.val() || 0;
                const newAttempts = previousAttempts + 1;
                await set(dbRef, newAttempts);
            } else {
                await set(dbRef, 0 ); 
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async currentAttempts(problem_no: String) {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list/${problem_no}/attempts`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val() || 0;
                return data;
            } else {
                return 0;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTotalUserAttempts() {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                let total_attempts = 0;
                for (const key in data) {
                    total_attempts += data[key].attempts;
                }
                return total_attempts;
            } else {
                return 0;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTotalSubmittedProblems() {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                let total_submits = 0;
                for (const key in data) {
                    if (data[key].status === 'Submitted!') {
                        total_submits += 1;
                    }
                }
                return total_submits;
            } else {
                return 0;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getUserNotAttemptedProblems() {
        try {
            if (!this.user) {
                return null;
            }
            const dbRef = ref(this.db, `users/${this.user.uid}/problems_list`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                let not_attempted = 0;
                for (const key in data) {
                    if (data[key].attempts === 0) {
                        not_attempted += 1;
                    }
                }
                return not_attempted;
            } else {
                return 0;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

const FirebaseInit = new Firebase();

export default FirebaseInit;
