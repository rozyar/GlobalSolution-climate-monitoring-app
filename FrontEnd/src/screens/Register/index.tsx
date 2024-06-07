import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../../helpers/api";

export const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.", [
        { text: "OK" },
      ]);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem.", [{ text: "OK" }]);
      return;
    }

    try {
      const response = await api.post("/user/register", {
        email,
        password,
        name,
      });

      if (response.status === 201) {
        navigation.replace("Main");
      }
    } catch (error) {
      console.error("Error registering:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao registrar. Por favor, tente novamente.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
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
