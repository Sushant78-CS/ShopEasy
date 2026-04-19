import { getProducts } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentSuccess() {
  const router = useRouter();

  const { items, clearCart } = useCartStore();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const selectItemsInCart = products.filter((product) => items[product.id] > 0);

  const removeAllFromCart = () => {
    clearCart();
  };

  const success = () => {
    router.replace("/(tabs)");
    removeAllFromCart();
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
      </View>
      <Text style={styles.title}>Payment Successful 🎉</Text>
      <Text style={styles.subtitle}>
        Your payment has been processed successfully. Thank you for your
        purchase!
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>Transaction ID</Text>
        <Text style={styles.value}>TXN123456789</Text>
        <Text style={styles.label}>Amount Paid</Text>
        <Text style={styles.value}>
          {selectItemsInCart.reduce(
            (total, item) =>
              total + (items[item.id] ? items[item.id] * item.price : 0),
            0,
          )}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={success}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    backgroundColor: "#dcfce7",
    padding: 20,
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#22c55e",
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
