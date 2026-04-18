import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const handleNav = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <Text>Hello Sushant</Text>
      <TouchableOpacity
        onPress={handleNav}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#007AFF",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Go to Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
