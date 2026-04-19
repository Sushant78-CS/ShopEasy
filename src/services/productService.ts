import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Alert } from "react-native";
import { auth, db } from "./firebase";

export const getProducts = async () => {
  const products = collection(db, "products");
  const querySnapshot = await getDocs(products);
  return querySnapshot.docs.map((doc: any) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const getRetailerProducts = async () => {
  try {
    if (!auth.currentUser) {
      throw new Error("No user logged in");
    }

    const q = query(
      collection(db, "products"),
      where("userId", "==", auth.currentUser?.uid),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching retailer products:", error);
    throw error;
  }
};

export interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export const addProduct = async (product: Product) => {
  try {
    if (!auth.currentUser) {
      throw new Error("No user logged in");
    }

    const products = collection(db, "products");
    const doc = await addDoc(products, {
      ...product,
      userId: auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    });
    return {
      id: doc.id,
      ...product,
    };
  } catch (error) {
    Alert.alert("Error", "Failed to add product");
    console.error("Error adding product:", error);
    throw error;
  }
};
