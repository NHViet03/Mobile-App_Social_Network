import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import ModalAlert from "../../components/ModalAlert";

import { io } from "socket.io-client";
import { uri } from "../../utils/fetchData";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import { loginAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      router.replace("/(tabs)/home");
    }
  }, [auth.token]);

  const handleLogin = async () => {
    const res = await dispatch(loginAction({ email, password }));

    if (res?.error) {
      return setAlert({
        title: "Đăng nhập không thành công",
        content: res.error,
        type: "error",
        handlePress: () => setAlert(false),
      });
    }
    if (res.success) {
      router.replace("/(tabs)/home");
      if (socket) return;
      const socket = io(`http://${uri}`, {
        transports: ["websocket"],
      });

      dispatch({
        type: GLOBAL_TYPES.SOCKET,
        payload: socket,
      });

      socket.on &&
        socket.on("connect", () => {
          console.log("Socket Connected");
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo-2.png")} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        name="email"
        value={email}
        onChangeText={(Text) => setEmail(Text)}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          borderWidth: 1,
          marginHorizontal: 20,
          borderColor: "#EEEEEE",
          borderRadius: 10,
          backgroundColor: "#EEEEEE",
        }}
      >
        <TextInput
          style={{
            padding: 10,
          }}
          placeholder="Mật khẩu"
          name="password"
          secureTextEntry={showPassword ? false : true}
          value={password}
          onChangeText={(Text) => setPassword(Text)}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{
            marginRight: 20,
          }}
        >
          <Text className="text-primary text-right">
            {showPassword ? "Ẩn" : "Hiển thị"}
          </Text>
        </Pressable>
      </View>
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={{ paddingHorizontal: 20 }}
      >
        <Text style={styles.button_login}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text style={styles.forgotpass}>Quên mật khẩu?</Text>
      <View style={styles.seperate}>
        <Text style={styles.seperate_space}></Text>
        <Text style={styles.seperate_or}>OR</Text>
        <Text style={styles.seperate_space}></Text>
      </View>

      <Pressable style={styles.login_facebook}>
        <FontAwesome5 name="facebook" size={30} color="#3338b6" />
        <Text style={styles.button_login_facebook}>Đăng nhập với Facebook</Text>
      </Pressable>
      <View style={styles.dont_have_account}>
        <Text style={styles.dont_have_account_text}>
          Bạn chưa có tài khoản?
        </Text>
        <Pressable onPress={() => router.replace("/register")}>
          <Text style={styles.dont_have_account_register}>Đăng ký</Text>
        </Pressable>
      </View>
      {alert && <ModalAlert alert={alert} />}
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  logo: {
    marginTop: 100,
    margin: 20,
    alignSelf: "center",
    marginBottom: 50,
    marginLeft: 50,
    resizeMode: "contain",
    width: 450,
    height: 100,
  },
  input: {
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },
  button_login: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#C43302",
    padding: 12,
    borderRadius: 12,
    marginTop: 24,
  },
  button_login_disable: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#e6a893",
    padding: 10,
    borderRadius: 20,
  },
  forgotpass: {
    textAlign: "center",
    margin: 15,
    color: "#C43302",
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 50,
  },
  seperate: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  seperate_space: {
    backgroundColor: "#d9d9d9",
    width: 150,
    height: 1.5,
  },
  seperate_or: {
    color: "#6D6D6D",
  },
  login_facebook: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo_facebook: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  button_login_facebook: {
    color: "#3338b6",
    marginLeft: 10,
  },
  dont_have_account: {
    marginTop: 120,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    gap: 10,
  },
  dont_have_account_text: {
    color: "#6D6D6D",
  },
  dont_have_account_register: {
    color: "#C43302",
    fontWeight: "500",
  },
});
