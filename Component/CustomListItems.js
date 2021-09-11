import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  Image,
  Input,
  Icon,
  Avatar,
  ListItem,
} from "react-native-elements";
import { db } from "../Config/Config";

const CustomListItems = ({ id, ChatName, enterChat }) => {
  const [newMessage, SetNewMessage] = useState([]);
  const [ranValue, setranValue] = useState("");
  useEffect(() => {
    var val = Math.floor(1000 + Math.random() * 9000);
    setranValue(val);
    // return val;
  }, []);
  useEffect(() => {
    const unsuscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        SetNewMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);
  return (
    <ListItem
      onPress={() => {
        enterChat(id, ChatName);
      }}
      key={id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: `https://picsum.photos/200/300?random=${ranValue}`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {ChatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {newMessage?.[0]?.displayName}:{newMessage?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItems;

const styles = StyleSheet.create({});
