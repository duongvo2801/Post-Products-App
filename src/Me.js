import React, { useContext } from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, View, TextInput, Button, ToastAndroid, Pressable } from 'react-native';
import { AppContext } from './AppContext';
import AxiosIntance from '../files/AxiosIntance';

import { launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react/cjs/react.development';

const Me = () => {
  const [imageLibary, setimageLibary] = useState(null);
  const {infoUser, setinfoUser} = useContext(AppContext);

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
    setinfoUser({...infoUser, avatar: response.data.path});

    if (response.error == false) {
      setimageLibary(response.data.path);
      ToastAndroid.show("Đăng ảnh thành công", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Đăng ảnh thất bại", ToastAndroid.SHORT);
    }
  };

  // console.log(infoUser);

  const updateProfile = async() => {
    const response = await AxiosIntance().post("/users/update-profile", {name: infoUser.name, address: infoUser.address, phone: infoUser.phone, dob: infoUser.dob, avatar: infoUser.avatar,});
      if(response.error == false) {
        ToastAndroid.show("Cật nhật thành công", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Cật nhật thất bại", ToastAndroid.SHORT);
      }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin</Text>
      <TouchableOpacity onPress={getImageLibrary}>
        {
          infoUser.avatar == ''
          ?
          <Image style={styles.image} source={require('../images/icons8-user-80.png')}></Image>
          :
          <Image style={styles.image} source={{uri: infoUser.avatar}}></Image>
        }
      </TouchableOpacity>
      

      <Text style={styles.textInfo}>{infoUser.email}</Text>
      <TextInput style={styles.textInput} placeholder='Họ tên' value={infoUser.name} onChangeText={(text) => setinfoUser({...infoUser, name: text})}/>
      <TextInput style={styles.textInput} placeholder='Địa chỉ' value={infoUser.address} onChangeText={(text) => setinfoUser({...infoUser, address: text})} />
      <TextInput style={styles.textInput} placeholder='Số điện thoại' value={infoUser.phone} onChangeText={(text) => setinfoUser({...infoUser, phone: text})} />
      <TextInput style={styles.textInput} placeholder='Ngày sinh' value={infoUser.dob} onChangeText={(text) => setinfoUser({...infoUser, dob: text})} />

      <Pressable style={styles.buttonUpdate} onPress={updateProfile}>
        <Text style={styles.textUpdate}>Cật nhật</Text>
      </Pressable>

    </View>
  )
}

export default Me;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "column",
  },
  image: {
    width: 170,
    height: 170,
    alignSelf: 'center'
  },
  title: {
    padding: 13,
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1877F2",
  },
  buttonUpdate: {
    height: 44,
    backgroundColor: "#1877F2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  textUpdate: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  textInfo: {
    color: '#006600',
    fontWeight: 'bold',
    padding: 5,
    marginLeft: 7,
    fontSize: 15,
    textAlign: 'center'
  },
  textInput: {
    borderBottomWidth: 1,
    marginTop: 10,
    padding: 5,
    backgroundColor: '#DCDCDC',
    borderRadius: 5,
  }
});