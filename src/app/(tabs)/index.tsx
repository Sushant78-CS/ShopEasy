import { DeliveryBar, SearchBar } from "@/components";
import { router } from "expo-router";
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
import { getProducts } from "../../services/productService";

const CATEGORIES = ["All", "Fashion", "Electronics", "Home", "Beauty"];

export default function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.log("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selected === "All"
      ? products
      : products.filter(
          (item) => item.category?.toLowerCase() === selected.toLowerCase(),
        );

  const searchFilterdProducts = products.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.push("/profile/locationEdit")}>
          <DeliveryBar />
        </TouchableOpacity>
        <SearchBar search={search} setSearch={setSearch} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cats}
        >
          {CATEGORIES.map((cat) => (
            <Text
              key={cat}
              style={[styles.catPill, selected === cat && styles.catActive]}
              onPress={() => setSelected(cat)}
            >
              {cat}
            </Text>
          ))}
        </ScrollView>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.grid}>
            {filteredProducts.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: "#f4f6f8",
  },

  cats: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },

  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "#666",
    fontSize: 12,
  },

  catActive: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 10,
  },

  card: {
    width: "47.5%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },

  title: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: 13,
  },

  price: {
    marginTop: 4,
    color: "green",
    fontWeight: "600",
  },
});
