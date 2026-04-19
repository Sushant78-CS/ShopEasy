import { getProducts } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, reduceFromCart, items } = useCartStore();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await getProducts();
      const found = products.find((item) => item.id === id);
      setProduct(found);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

  if (!product) {
    return <Text style={{ padding: 20 }}>Product not found</Text>;
  }

  const addToCartFun = () => {
    addToCart(product.id);
  };

  const reduceProduct = () => {
    reduceFromCart(product.id);
  };

  const handleCart = () => {
    if (items[product.id] > 0) {
      router.push("/cart");
    } else {
      addToCartFun();
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: product.image }} style={styles.image} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>

            <Text style={styles.price}>₹{product.price}</Text>

            <Text style={styles.desc}>
              {product.description || "No description available"}
            </Text>
          </View>

          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={reduceProduct}
                disabled={items[product.id] === 0}
              >
                <Ionicons
                  name="remove"
                  size={18}
                  color={items[product.id] > 0 ? "#fff" : "#aaa"}
                />
              </TouchableOpacity>

              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{items[product.id] || 0}</Text>
              </View>

              <TouchableOpacity style={styles.qtyButton} onPress={addToCartFun}>
                <Ionicons name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  imageWrapper: {
    backgroundColor: "#fff",
    padding: 16,
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
  },

  content: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111",
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#16a34a",
    marginBottom: 12,
  },

  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },

  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderColor: "#eee",
  },

  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  quantitySection: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 10,
  },

  quantityLabel: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  qtyButton: {
    backgroundColor: "#111",
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  qtyBox: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 60,
  },

  productImage: {
    height: 120,
    borderRadius: 8,
    marginBottom: 6,
  },

  productTitle: {
    fontSize: 14,
    marginBottom: 4,
  },

  productPrice: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007185",
  },
});
