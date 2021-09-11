import React, { useLayoutEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
// import { Header } from "react-navigation-stack";
import { Avatar, Input } from "react-native-elements";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../Config/Config";
import firebase from "firebase/app";
const ChatScreen = ({ navigation, route }) => {
  const [sendMsg, setSendMsg] = useState("");
  const [message, setMessage] = useState([]);
  const sendMessage = () => {
    if (sendMsg === "") {
      return;
    }
    // console.log("helo");
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: sendMsg,
      displayName: route.params.ChatName,
      // photoURL: auth.currentUser.imageURL,
      email: auth.currentUser.email,
    });
    setSendMsg("");
  };
  useLayoutEffect(() => {
    const unsuscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessage(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsuscribe;
  }, [route]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: "https://picsum.photos/200/300?random=4",
            }}
          />
          <Text style={{ marginLeft: 10, color: "#fff", fontWeight: "bold" }}>
            {route.params.ChatName}
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity>
            <FontAwesome
              name="video-camera"
              // onPress={() => navigation.goBack()}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, message]);
  return (
    // flex 1 for consider full page bgcolor
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* <Text>{route.params.ChatName}</Text> */}
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <TouchableWithoutFeedback>
          <>
            <ScrollView>
              {message.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.sender}>
                    <Text style={styles.senderText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.reciever}>
                    <Text style={styles.recieverText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                value={sendMsg}
                onChangeText={(text) => setSendMsg(text)}
                onSubmitEditing={sendMessage}
                placeholder="Enter Message..."
              />
              {/* rightIcon={<Ionicons name="send" size={24} color="#2C6BED" />} */}
              <TouchableOpacity activeOpacity={0.5}>
                <Ionicons
                  name="send"
                  onPress={sendMessage}
                  size={24}
                  color="#2C6BED"
                />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <Text>{route.params.ChatName}</Text> */}
      {/* <Text style={{ height: 40 }}></Text> */}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    flex: 1,
    marginRight: 15,
    borderRadius: 20,
    borderColor: "transparent",
    color: "grey",
    height: 40,
    backgroundColor: "#ECECEC",
    // height: 40,
    padding: 10,
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    color: "#fff",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 10,
    maxWidth: "80%",
    position: "relative",
    alignSelf: "flex-end",
    marginTop: 3,
  },
  reciever: {
    padding: 15,
    marginTop: 3,
    backgroundColor: "#2B68E6",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    alignSelf: "flex-start",
    color: "white",
  },
  senderName: {
    fontSize: 12,
    color: "#fff",
  },
  recieverText: {},
  senderText: {},
});
