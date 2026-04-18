import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "./firebase";

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
    const products = collection(db, "products");
    const doc = await addDoc(products, {
      ...product,
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
