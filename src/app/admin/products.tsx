import { db } from "@/services/firebase";
import { getRetailerProducts } from "@/services/productService";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchData = async () => {
    const data = await getRetailerProducts();
    console.log(data);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "products", id));
          fetchData();
        },
      },
    ]);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconBtn}
            >
              <Ionicons name="arrow-back" size={20} color="#111" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Products</Text>
            <TouchableOpacity
              onPress={() => router.push("/admin/addproducts")}
              style={styles.iconBtn}
            >
              <Ionicons name="add" size={22} color="#111" />
            </TouchableOpacity>
          </View>
        }
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginTop: "50%",
                fontSize: 18,
                fontWeight: "600",
                color: "#666",
              }}
            >
              No products found
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/admin/addproducts")}
              style={{
                backgroundColor: "#111",
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Add Product</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: 90,
    height: 90,
  },

  info: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },

  title: {
    fontWeight: "600",
    fontSize: 14,
  },

  price: {
    color: "green",
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    marginTop: 6,
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  deleteText: {
    color: "#fff",
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    gap: 16,
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  iconBtn: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 12,
  },
});
