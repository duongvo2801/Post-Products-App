import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Pressable, 
  Button, TextInput, ToastAndroid, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, AntDesign, FontAwesome, Feather } from "@expo/vector-icons";

import { launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

import AxiosIntance from "../../files/AxiosIntance";
import Avatar from "../avatar/Avatar";

const PostNews = () => {
  const [imageLibary, setimageLibary] = useState(null);
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const getImageLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result.assets[0].uri);

    const formdata = new FormData();
    formdata.append("image", {
      uri: result.assets[0].uri,
      type: "image/jpeg",
      name: "image.jpeg",
    });

    const response = await AxiosIntance("multipart/form-data").post( "/media/upload", formdata );
    console.log(response);

    if (response.error == false) {
      setimageLibary(response.data.path);
      ToastAndroid.show("Đăng ảnh thành công", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Đăng ảnh thất bại", ToastAndroid.SHORT);
    }
  };

  const postNews = async () => {
    const response = await AxiosIntance().post("/articles", { title: title, content: content, image: imageLibary, });
    if (response.error == false) {
      ToastAndroid.show("Đăng tin thành công", ToastAndroid.SHORT);
      console.log('Post successful');
    } else {
      ToastAndroid.show("Đăng tin thất bại", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.row}>
            <Avatar source={require("../../images/avatar.jpg")}></Avatar>
            <View style={{ paddingLeft: 10 }}>
              <Text style={styles.user}>Võ Văn Dương</Text>
              <View style={styles.row}>
                <Text style={styles.time}>3p</Text>
                <Entypo name="dot-single" size={12} color={"#747476"} />
                <Entypo name="globe" size={12} color={"#747476"} />
              </View>
            </View>
          </View>
          <Entypo name="dots-three-horizontal" size={18} color={"#222121"} />
        </View>

        <View style={styles.footer}>
          <Image style={styles.image} source={{uri: imageLibary}}/>
          <View style={styles.seperator} />
          <TextInput style={{fontSize: 18, fontWeight: 'bold'}} placeholder="Tiêu đề" onChangeText={settitle} />
          <View style={styles.seperator} />
          <TextInput style={{fontSize: 15}} placeholder="Nội dung" onChangeText={setcontent} />
          <View style={styles.container2}>
            <View style={styles.row2}>
              <TouchableOpacity style={styles.menu2} onPress={getImageLibrary}>
                <Feather name="image" size={25} color="#4CAF50" />
                <Text style={styles.menuText2}>Thư viện</Text>
              </TouchableOpacity>
              <View style={styles.seperator2} />
              <TouchableOpacity style={styles.menu2} onPress={postNews}>
                <Feather name="upload" size={25} color="red" />
                <Text style={styles.menuText2}>ĐĂNG</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomDevider} />
      </ScrollView>
    </View>
  );
};

export default PostNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  image: {
    width: '100%',
    height: 250,
    marginTop: 8,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  user: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222121",
  },
  time: {
    fontSize: 12,
    color: "#747476",
  },
  post: {
    fontSize: 14,
    color: "#222121",
    lineHeight: 16,
    marginTop: 5,
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222121",
    lineHeight: 16,
    marginTop: 8,
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  photo: {
    marginTop: 9,
    width: "100%",
    height: 300,
  },
  footer: {
    paddingVertical: 0,
    paddingHorizontal: 11,
  },
  footerCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    paddingHorizontal: 0,
  },
  iconCount: {
    backgroundColor: "#E93547",
    width: 23,
    height: 23,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  textCount: {
    fontSize: 13,
    color: "#424040",
  },
  seperator: {
    width: "100%",
    height: 14,
    backgroundColor: "#f9f9f9",
  },
  footerMenu: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 0,
  },
  button: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 15,
    color: "#424040",
  },
  bottomDevider: {
    width: "100%",
    height: 9,
    backgroundColor: "#f0f2f5",
  },
  container2: {
    width: "100%",
    height: 92,
  },
  row2: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 11,
    alignItems: "center",
    marginTop: 14,
  },
  input2: {
    height: 50,
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 8,
  },
  divider2: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#F0F0F0",
  },
  menu2: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
  },
  menuText2: {
    padding: 6,
    fontWeight: "500",
    fontSize: 16,
  },
  seperator2: {
    width: 2,
    height: 26,
    backgroundColor: "#F0F0F0",
  },
  bottomDevider2: {
    width: "100%",
    height: 9,
    backgroundColor: "#f0f2f5",
  },
});
