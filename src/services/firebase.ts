import { initializeApp } from 'firebase/app';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,                   
  getAuth,   
  sendPasswordResetEmail,     
  updateProfile,                 
  updatePassword,                
  sendEmailVerification           
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { 
  getStorage,    
  ref,          
  uploadBytes,    
  getDownloadURL   
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;

export const authService = {
  login: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  register: async(email:string, password: string, displayName: string)=>{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user,{displayName});
    return userCredential;
  },

  logout: async()=>{
    return await signOut(auth);
  },

  resetPassword: async(email: string)=>{
    return await sendPasswordResetEmail(auth,email);
  },

  uploadAvatar: async (file: File, userId: string) =>{
    const storageRef = ref(storage, `avatars/${userId}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  }
};