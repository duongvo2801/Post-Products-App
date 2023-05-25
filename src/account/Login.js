import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import React, { Component, useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AxiosIntance from "../../files/AxiosIntance";
import { AppContext } from "../AppContext";
import { useRef } from "react/cjs/react.development";

const Login = (props) => {
  // chuyen giua 2 man hinh
  const {navigation} = props;
  const [emailUser, setemailUser] = useState("");
  const [passwordUser, setpasswordUser] = useState("");
  const {setisLogin, setinfoUser} = useContext(AppContext);

  // duong2801@gmail.com 2801
  const dataLogin = async() => {
    console.log(emailUser, passwordUser);
    try {
      const response = await AxiosIntance().post("/auth/login", {email: emailUser, password: passwordUser});

      if(response.error == false) {
        // luu token
        await AsyncStorage.setItem('token', response.data.token);
        ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
        setinfoUser(response.data.user);
        setisLogin(true);
      }else {
        ToastAndroid.show("Đăng nhập thất bại", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // chuyen qua man hinh register
  const btnRegister = () => {
    navigation.navigate('Register');
  }

  const ref_input2 = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
      <Text style={[styles.text, { color: "#1877F2", marginBottom: 40 }]}>
        Again
      </Text>

      <Text>Tên đăng nhập</Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={() => ref_input2.current.focus()}
        autoFocus={true}
        returnKeyType="next"
        onChangeText={setemailUser}
      />
      <Text style={{ marginTop: 7 }}>Mật khẩu</Text>
      <TextInput
        style={styles.textInput}
        ref={ref_input2}
        secureTextEntry={true}
        onChangeText={setpasswordUser}
      />

      <Pressable style={styles.buttonLogin} onPress={dataLogin}>
        <Text style={styles.textLogin}>Đăng nhập</Text>
      </Pressable>

      <Pressable onPress={btnRegister}>
        <Text style={styles.textSocial}>
          {" "}
          Chưa có tài khoản?{" "}
          <Text style={{ color: "#1877F2", fontWeight: "bold" }}>Đăng ký</Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "column",
  },
  text: {
    
    fontSize: 40,
    fontWeight: "bold",
    color: "#050505",
  },
  textInput: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    padding: 10
  },
  viewRemember: {
    flexDirection: "row",
  },
  buttonLogin: {
    height: 44,
    backgroundColor: "#1877F2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  textLogin: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  textSocial: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
  imageSocial: {
    width: 21,
    height: 21,
    marginEnd: 10,
  },
  buttonSocial: {
    flexDirection: "row",
    width: 148,
    height: 48,
    backgroundColor: "#DDDDDD",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
