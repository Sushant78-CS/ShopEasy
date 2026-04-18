import { getProducts } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductSection() {
  const router = useRouter();
  const { addToCart, reduceFromCart, items } = useCartStore();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);
  const addProduct = (productId: string) => {
    addToCart(productId);
  };

  const reduceProduct = (productId: string) => {
    reduceFromCart(productId);
  };

  useEffect(() => {
    console.log("Products:", products);
  }, [products]);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              For You
            </Text>
          </View>
        }
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              margin: 5,
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push(`/profile/${item.id}`)}
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: 120, borderRadius: 8 }}
                resizeMode="cover"
              />
              <Text numberOfLines={1}>{item.title}</Text>
              <Text style={{ fontWeight: "bold" }}>₹{item.price}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={() => addProduct(item.id)}>
                  <Text style={{}}>
                    <Ionicons
                      name="add"
                      size={24}
                      style={{ fontWeight: "bold" }}
                    />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => reduceProduct(item.id)}>
                  <Text style={{}}>
                    <Ionicons
                      name="remove"
                      size={24}
                      style={{ fontWeight: "bold" }}
                    />
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text>{items[item.id] || 0}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
