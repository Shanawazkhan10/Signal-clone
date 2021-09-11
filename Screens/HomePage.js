import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CustomListItems from "../Component/CustomListItems";
import { auth, db } from "../Config/Config";
import { AntDesign, Foundation } from "@expo/vector-icons";
const HomePage = ({ navigation }) => {
  const [chats, setChat] = useState([]);
  useEffect(() => {
    const unsuscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChat(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsuscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        color: "black",
      },
      headerTintColor: "black",

      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={signout}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: 80,
            marginRight: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black"></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Foundation
              onPress={() => navigation.navigate("CreateChats")}
              name="pencil"
              size={24}
              style={{ marginLeft: 15 }}
              color="black"
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const signout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  const enterChat = (id, ChatName) => {
    navigation.navigate("ChatScreen", {
      id,
      ChatName,
    });
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/* {console.log(chats)} */}
        {chats.map(({ id, data: { ChatName } }) => (
          <CustomListItems
            key={id}
            id={id}
            ChatName={ChatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
