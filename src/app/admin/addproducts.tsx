import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addProduct, Product } from "../../services/productService";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleAddProduct = () => {
    if (!productName || !productPrice || !productDescription || !productImage) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    const product: Product = {
      title: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      image: productImage,
      rating: 0,
      category: productCategory,
    };
    addProduct(product);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage("");
    setProductCategory("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Add Product
        </Text>
        <View
          style={{
            backgroundColor: "#fff",
            padding: 16,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          {[
            {
              label: "Product Name",
              value: productName,
              setter: setProductName,
              placeholder: "Enter product name",
            },
            {
              label: "Price",
              value: productPrice,
              setter: setProductPrice,
              placeholder: "Enter price",
            },
            {
              label: "Description",
              value: productDescription,
              setter: setProductDescription,
              placeholder: "Enter description",
            },
            {
              label: "Category",
              value: productCategory,
              setter: setProductCategory,
              placeholder: "Enter category",
            },
            {
              label: "Image URL",
              value: productImage,
              setter: setProductImage,
              placeholder: "Paste image URL",
            },
          ].map((field, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 6, fontWeight: "600" }}>
                {field.label}
              </Text>
              <TextInput
                placeholder={field.placeholder}
                value={field.value}
                onChangeText={field.setter}
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: "#fafafa",
                }}
              />
            </View>
          ))}
          {productImage ? (
            <Image
              source={{ uri: productImage }}
              style={{
                width: "100%",
                height: 150,
                borderRadius: 10,
                marginBottom: 16,
              }}
            />
          ) : null}
          <TouchableOpacity
            onPress={handleAddProduct}
            style={{
              backgroundColor: "#0a84ff",
              padding: 14,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Add Product
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProducts;
