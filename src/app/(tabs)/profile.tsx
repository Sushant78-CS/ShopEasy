import { signOut } from "@/services/auth";
import useAuthStore from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();

  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/32703420/pexels-photo-32703420.jpeg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.displayName || "User"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <ProfileItem
          icon="person-outline"
          title="Edit Profile"
          onpress={() => {
            router.push("/profile/editProfile");
          }}
        />

        <ProfileItem
          icon="cube-outline"
          title="My Orders"
          onpress={() => router.push("/cart")}
        />

        <ProfileItem
          icon="location-outline"
          title="Shipping Address"
          onpress={() => {
            router.push("/profile/locationEdit");
          }}
        />

        <ProfileItem
          icon="card-outline"
          title="Payment Methods"
          onpress={() => {}}
        />

        <ProfileItem
          icon="settings-outline"
          title="Settings"
          onpress={() => {}}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <View style={{ padding: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => router.push("/admin/retailer")}
        >
          <Text style={{ fontWeight: "600" }}>Start Selling</Text>
          <Text style={{ color: "#666", fontSize: 12 }}>
            Add and manage your products
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const ProfileItem = ({
  icon,
  title,
  onpress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onpress: () => void;
}) => (
  <TouchableOpacity style={styles.item} onPress={onpress}>
    <View style={styles.left}>
      <Ionicons name={icon} size={22} color="#374151" />
      <Text style={styles.itemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
    resizeMode: "cover",
    borderWidth: 1.5,
    borderColor: "#000",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  email: {
    fontSize: 14,
    color: "#1e2026",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 12,
    paddingVertical: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#e5e7eb",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#111827",
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 12,
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
  },
  logoutText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  headerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
