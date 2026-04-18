import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DeliveryBar() {
  const [city, setCity] = useState("Fetching Location");

  useFocusEffect(
    useCallback(() => {
      const loadCity = async () => {
        const savedCity = await AsyncStorage.getItem("city");
        if (savedCity) setCity(savedCity);
      };
      loadCity();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📍</Text>
      <View>
        <Text style={styles.small}>Deliver to</Text>
        <Text style={styles.location}>{city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f3ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  small: {
    fontSize: 12,
    color: "#555",
  },
  location: {
    fontSize: 14,
    fontWeight: "600",
  },
});
