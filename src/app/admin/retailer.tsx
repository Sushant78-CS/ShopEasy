import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RetailerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          <View style={styles.hero}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
              }}
              style={styles.heroImage}
            />

            <Text style={styles.title}>Sell your products, your way</Text>

            <Text style={styles.subtitle}>
              No setup headaches. Just list your product and you’re live.
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => router.push("/admin/addproducts")}
            >
              <Text style={styles.primaryText}>Start selling</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtnHero}
              onPress={() => router.push("/admin/products")}
            >
              <Text style={styles.secondaryTextHero}>View My Products</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 18,
  },

  hero: {
    marginTop: 10,
  },

  heroImage: {
    width: "100%",
    height: 160,
    borderRadius: 14,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 18,
    lineHeight: 20,
  },

  primaryBtn: {
    backgroundColor: "#111",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "500",
  },

  card: {
    marginTop: 25,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },

  sectionHeading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 10,
  },

  emoji: {
    fontSize: 18,
  },

  rowTitle: {
    fontWeight: "600",
  },

  rowDesc: {
    color: "#666",
    fontSize: 13,
    lineHeight: 18,
  },

  bottom: {
    marginTop: 25,
  },

  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryText: {
    fontWeight: "500",
    color: "#333",
  },

  note: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 10,
  },
  secondaryBtnHero: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    alignItems: "center",
  },

  secondaryTextHero: {
    fontWeight: "500",
    color: "#333",
  },
});
