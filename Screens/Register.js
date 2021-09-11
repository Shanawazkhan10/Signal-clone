import React, { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Text, Image, Input, Icon } from "react-native-elements";
import { auth } from "../Config/Config";
const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || "https://picsum.photos/200/300",
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text h4 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          onChangeText={(text) => setName(text)}
          type="text"
          value={name}
        />
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          type="text"
          value={email}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          type="Password"
          secureTextEntry
          value={password}
        />
        <Input
          placeholder="Profile Picture (optiional)"
          onChangeText={(text) => setImageUrl(text)}
          type="file"
          value={imageUrl}
          onSubmitEditing={register}
        />
      </View>
      <Button style={styles.button} onPress={register} title="Register" />
      <Text
        style={{ color: "#2C6BED", marginTop: 5 }}
        onPress={() => navigation.navigate("Login")}
      >
        Already have a Account?
      </Text>
      {/* <View style={{ height: 50 }} /> */}
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
