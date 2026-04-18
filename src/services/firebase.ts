import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS_dmdvfTqLNSglHqVCBUtt_rNdFloYCM",
  authDomain: "storeapp-f525d.firebaseapp.com",
  projectId: "storeapp-f525d",
  // storageBucket: "storeapp-f525d.appspot.com",
  storageBucket: "storeapp-f525d.firebasestorage.app",
  messagingSenderId: "648708062948",
  appId: "1:648708062948:web:c267ad3b6d72ea98b876f1",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;
