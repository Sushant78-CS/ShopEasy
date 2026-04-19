import { getProducts } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartPage = () => {
  const { items, addToCart, reduceFromCart, clearCart } = useCartStore();
  const route = useRouter();
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

  const removeAllFromCart = () => {
    clearCart();
  };

  const selectItemsInCart = products.filter((product) => items[product.id] > 0);

  const checkSignIn = () => {
    if (selectItemsInCart.length > 0) {
      route.push("/check/checkout");
    } else {
      Alert.alert("Cart is empty");
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <FlatList
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
            <View
              style={{ zIndex: 1, position: "absolute", top: 600, right: 30 }}
            >
              <TouchableOpacity
                onPress={removeAllFromCart}
                style={{
                  backgroundColor: "black",
                  width: 48,
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Ionicons name="trash" size={28} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                onPress={checkSignIn}
                style={{
                  backgroundColor: "black",
                  padding: 15,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  CheckOut
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CartPage;

const styles = StyleSheet.create({});
