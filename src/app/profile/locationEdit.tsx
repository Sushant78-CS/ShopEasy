import fetchLocation from "@/services/locationService";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationScreen() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    if (!city.trim()) {
      setLoading(false);
      return;
    }

    const cleanCity = city.trim().toLowerCase();

    await AsyncStorage.setItem("city", cleanCity);
    setLoading(false);
    setCity("");
    router.back();
  };

  const handleUseCurrentLocation = async () => {
    setLoading(true);
    const result = await fetchLocation(true);
    console.log("Location result:", result?.toLowerCase());

    if (!result) {
      setLoading(false);
      Alert.alert("Unable to fetch location. Please allow permission.");
      return;
    }
    await AsyncStorage.setItem("city", result.toLowerCase());
    setLoading(false);
    setCity("");
    router.back();
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 20 }}
        >
          <Ionicons name="chevron-back" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Set your location</Text>
        <TouchableOpacity
          style={styles.locationBtn}
          onPress={handleUseCurrentLocation}
        >
          <Text style={styles.locationBtnText}>
            {loading ? "Fetching..." : "📍 Use Current Location"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", marginVertical: 10, color: "#888" }}
        >
          OR
        </Text>

        <TextInput
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#1a1a1a",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  locationBtn: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
  },

  locationBtnText: {
    fontWeight: "600",
  },
});
