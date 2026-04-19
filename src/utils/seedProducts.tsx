import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

const products = [
  {
    title: "Puma Sports Shoes",
    description: "Lightweight sports shoes",
    price: 2199,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    category: "fashion",
    rating: 4,
  },
  {
    title: "Samsung Galaxy S23",
    description: "Powerful Android phone",
    price: 69999,
    image: "https://images.unsplash.com/photo-1510557880182-3c2e3b8f06e5",
    category: "electronics",
    rating: 4,
  },
  {
    title: "OnePlus 11",
    description: "Fast and smooth performance",
    price: 55999,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    category: "electronics",
    rating: 4,
  },
  {
    title: "Sony Headphones",
    description: "Noise cancelling headphones",
    price: 4999,
    image: "https://images.unsplash.com/photo-1518441902117-9e1b3a2d1c1b",
    category: "electronics",
    rating: 4,
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable speaker with bass",
    price: 1999,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223f8d9",
    category: "electronics",
    rating: 4,
  },
  {
    title: "Smart Watch",
    description: "Track your fitness daily",
    price: 1999,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    category: "electronics",
    rating: 4,
  },
  {
    title: "Laptop Bag",
    description: "Water resistant laptop bag",
    price: 899,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    category: "fashion",
    rating: 4,
  },
  {
    title: "Wooden Chair",
    description: "Modern wooden chair",
    price: 1599,
    image: "https://images.unsplash.com/photo-1582582429416-9e8c1a5b5c44",
    category: "home",
    rating: 4,
  },
  {
    title: "Dining Table",
    description: "6-seater dining table",
    price: 8999,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    category: "home",
    rating: 4,
  },
  {
    title: "Sofa Set",
    description: "Comfortable 3-seater sofa",
    price: 15999,
    image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f",
    category: "home",
    rating: 5,
  },
  {
    title: "Bed Mattress",
    description: "Soft and durable mattress",
    price: 6999,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    category: "home",
    rating: 4,
  },
  {
    title: "Table Lamp",
    description: "Warm light lamp",
    price: 899,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    category: "home",
    rating: 4,
  },
  {
    title: "Wall Clock",
    description: "Minimal wall clock",
    price: 499,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    category: "home",
    rating: 4,
  },
  {
    title: "Makeup Kit",
    description: "All-in-one beauty kit",
    price: 1299,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    category: "beauty",
    rating: 4,
  },
  {
    title: "Perfume",
    description: "Long lasting fragrance",
    price: 999,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223f8d9",
    category: "beauty",
    rating: 4,
  },
  {
    title: "Face Wash",
    description: "Gentle skin cleanser",
    price: 299,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    category: "beauty",
    rating: 4,
  },
  {
    title: "Hair Dryer",
    description: "Fast drying hair dryer",
    price: 1499,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223f8d9",
    category: "beauty",
    rating: 4,
  },
  {
    title: "Backpack",
    description: "Durable travel backpack",
    price: 1999,
    image: "https://images.unsplash.com/photo-1514477917009-389c76a86b68",
    category: "fashion",
    rating: 4,
  },
  {
    title: "T-Shirt",
    description: "Cotton casual t-shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "fashion",
    rating: 4,
  },
  {
    title: "Jeans",
    description: "Slim fit denim jeans",
    price: 1499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "fashion",
    rating: 4,
  },
  {
    title: "Jacket",
    description: "Winter jacket",
    price: 2499,
    image: "https://images.unsplash.com/photo-1520975922284-9e0ce827dc0a",
    category: "fashion",
    rating: 4,
  },
  {
    title: "Cap",
    description: "Stylish cap",
    price: 299,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    category: "fashion",
    rating: 4,
  },
];

export const seedProducts = async () => {
  try {
    for (const product of products) {
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: serverTimestamp(),
      });
    }
    console.log("Products added successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
