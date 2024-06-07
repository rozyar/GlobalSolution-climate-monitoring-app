import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../helpers/api";

interface Props {
  navigation: any;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await api.post("/auth/check-token");
          if (response.data.status === "valid") {
            navigation.replace("Main");
          }
        } catch (error) {
          console.error("Token validation error:", error);
        }
      }
    };
    checkToken();
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token, name, email: userEmail } = response.data;
      await AsyncStorage.setItem("token", access_token);
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("email", userEmail);
      navigation.replace("Main");
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao fazer login. Por favor, tente novamente.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "#fff",
    backgroundColor: "#333",
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 10,
    alignItems: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    marginTop: 12,
    color: "#ff6347",
    textAlign: "center",
  },
});
