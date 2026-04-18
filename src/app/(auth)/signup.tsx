import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUp } from "../../services/auth";

const SignUpPage = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const user = await signUp(email, password, fullName);
      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error handling sign up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={[styles.mainContainer]}>
      <View style={[styles.container]}>
        <View style={[styles.content]}>
          <Text style={styles.title}>Create Account</Text>
        </View>
        <View style={[styles.inputContainer]}>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={[styles.buttonText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottomSection]}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.signUpText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  content: {
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  bottomSection: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  bottomText: {
    fontSize: 16,
    color: "#4e5152ff",
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 5,
  },
});
