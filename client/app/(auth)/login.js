import { Pressable, StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { router } from "expo-router";


const login = () => {
  // const [passwordVisible, setPasswordVisible] = useState(true);
  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!password);
  // }
  const initialState = {
    email: '',
    password: '',
  };
  const [userData, setUserData] = useState(initialState);
  const {email, password} = userData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <View className="flex-1 items-center justify-center bg-red-200" style={{
      flex:1,
      justifyContent:'flex-end'
    }}>
      <Text className="text-red-500">login</Text>

      <Pressable onPress={() => router.replace("/register")}>
        <Text style={styles.dont_have_account_register} >Đăng kí</Text>
      </Pressable>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo:{
    marginTop: 100,
    margin: 20,
    alignSelf: "center",
    marginBottom: 50,
    resizeMode: "contain",
    width: 400,
    height: 100,
  },
  input:{
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },
  // toggleVisibilityText: {
  //   textAlign: "center",
  //   color: "#C43302",
  //   marginVertical: 10,
  // },
  button_login:{
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#C43302",
    padding: 10,
    borderRadius: 20,
  },
  forgotpass:{
    textAlign: "center",
    margin: 15,
    color : "#C43302",
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 50,
  },
  seperate:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  seperate_space:{
    backgroundColor: "#EEEEEE",
    width: 150,
    height: 1,
  },
  seperate_or:{
    color : "#6D6D6D",
  },
  login_faceook:{
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 70,
  },
  logo_facebook:{
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  button_login_facebook:{
    color : "#3338b6",
    marginLeft: 10,
  },
  dont_have_account:{
    marginTop: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  dont_have_account_text:{
    color : "#6D6D6D",
  },
  dont_have_account_register:{
    color : "#C43302",
  },
});
