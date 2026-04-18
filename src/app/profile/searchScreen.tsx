import { getProducts } from "@/services/productService";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const filteredProducts = products.filter((item: any) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <ScrollView>
          <View style={styles.grid}>
            {filteredProducts.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
