// import { Button } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../Config/Config";
const Chats = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, []);
  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        ChatName: input,
      })
      .then(() => {
        // console.log("i work");
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter new chat name"
        onChangeText={(text) => setInput(text)}
        leftIcon={<Icon name="wechat" size={24} color="black" />}
      />
      <Button
        style={{ width: 300 }}
        title="Create new Chat"
        onPress={createChat}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
});
