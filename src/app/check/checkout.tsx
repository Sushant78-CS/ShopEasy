import { getProducts } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckOutPage = () => {
  const { items } = useCartStore();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const selectItemsInCart = products.filter((product) => items[product.id] > 0);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 84 }}
        ListHeaderComponent={
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              Your Cart
            </Text>
          </View>
        }
        data={selectItemsInCart}
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
              width: "45%",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ height: 120, borderRadius: 8 }}
            />
            <Text numberOfLines={1}>{item.title}</Text>
            <Text style={{ fontWeight: "bold" }}>₹{item.price}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>{items[item.id] || 0}</Text>
              </View>
            </View>
            <View>
              <Text>
                Total: ₹{items[item.id] ? items[item.id] * item.price : 0}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Grand Total: ₹
                {selectItemsInCart.reduce(
                  (total, item) =>
                    total + (items[item.id] ? items[item.id] * item.price : 0),
                  0,
                )}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  router.replace("/check/success");
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                    backgroundColor: "#000",
                    padding: 10,
                    borderRadius: 5,
                    textAlign: "center",
                  }}
                >
                  Place your order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CheckOutPage;

const styles = StyleSheet.create({});
