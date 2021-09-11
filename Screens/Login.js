import React, { useState, useEffect } from "react";
import { Button, Image, Input, Icon } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import logo from "../assets/signalIco.png";
import { auth } from "../Config/Config";
const Login = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const login = () => {
    // console.log(Email, Password);
    auth.signInWithEmailAndPassword(Email, Password).catch((error) => {
      alert(error);
    });
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        navigation.replace("Home");
      }
    });
    return unsuscribe;
  }, []);
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          //   autoFocus
          type="email"
          value={Email}
        />
        <Input
          placeholder="Password"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          type="password"
        />
      </View>
      <Button containerStyle={styles.button} onPress={login} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        title="Register"
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
