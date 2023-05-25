import CheckBox from "@react-native-community/checkbox";
import React, { Component, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, Image, ToastAndroid, } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { useRef } from "react/cjs/react.development";
import AxiosIntance from "../../files/AxiosIntance";

const Register = (props) => {
  const {navigation} = props;
  const btnLogin = () => {
    navigation.navigate('Login');
  }

  // lay gia tri textInput
  const [emailUser, setemailUser] = useState("");
  const [passwordUser, setpasswordUser] = useState("");
  const [rePasswordUser, setrePasswordUser] = useState("");
  const dataRegister = async() => {
    console.log(emailUser, passwordUser);
    try {
      // gui data len API
      const response = await AxiosIntance().post("/users/register", {email: emailUser, password: passwordUser});
      console.log(response);

      if(response.error == false) {
        ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
        navigation.navigate('Login');
      }else {
        ToastAndroid.show("Đăng ký thất bại", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const ref_input2 = useRef();
  const ref_input3 = useRef();


  return (
    <View style={styles.container}>
      <Text style={styles.textRegister}>Đăng ký</Text>
      <Text style={styles.textTitle}>
        Tạo tài khoản để kết nối với chúng tôi
      </Text>

      <Text>
        Tên đăng nhập<Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={() => ref_input2.current.focus()}
        autoFocus={true}
        returnKeyType="next"
        onChangeText={setemailUser}
      />
      <Text>
        Mật khẩu<Text style={styles.star}>*</Text>
      </Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={() => ref_input3.current.focus()}
        returnKeyType="next"
        secureTextEntry={true}
        ref={ref_input2}
        onChangeText={setpasswordUser}
      />
      <Text>
        Nhập lại mật khẩu<Text style={styles.star}>*</Text>
      </Text>
      <TextInput 
        style={styles.textInput} 
        ref={ref_input3} 
        secureTextEntry={true}
        onChangeText={setrePasswordUser}
      />

      <Pressable style={styles.buttonLogin} onPress={dataRegister}>
        <Text style={styles.textLogin}>Đăng ký</Text>
      </Pressable>
      <Pressable onPress={btnLogin}>
        <Text style={styles.textSocial}>
          Đã có tài khoản?{" "}
          <Text style={{ color: "#1877F2", fontWeight: "bold" }}>
            Đăng nhập
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    flexDirection: "column",
  },
  textRegister: {
    marginTop: 15,
    fontSize: 40,
    fontWeight: "bold",
    color: "#1877F2",
    paddingTop: 16,
    paddingBottom: 3,
  },
  textTitle: {
    marginBottom: 50,
    color: '#189FF2'
  },
  textInput: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 5,
    padding: 10
  },
  viewRemember: {
    flexDirection: "row",
  },
  buttonLogin: {
    height: 44,
    backgroundColor: "#1877F2",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  textLogin: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  textSocial: {
    textAlign: 'center',
    marginTop: 10,
  },
  star: {
    color: 'red', 
    fontWeight: 'bold'
  }
});
