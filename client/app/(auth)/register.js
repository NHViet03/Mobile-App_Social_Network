import {
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Alert
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/actions/authAction";
import RegisterFirst from "../../components/register/RegisterFirst";
import RegisterSecond from "../../components/register/RegisterSecond";
import ModalAlert from "../../components/ModalAlert";

const register = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
    birthday: new Date(),
  });
  const [alert,setAlert]=useState(false);

  const dispatch = useDispatch();

  const handleRegister = async () => {
    const res = await dispatch(registerAction(userData));

    if (res?.error) {
      return setAlert({
        title: "Tạo tài khoản không thành công",
        content: res.error,
        type: "error",
        handlePress: () => setAlert(false),
      });
    }
    if (res?.success) {
      return setAlert({
        title:"Tạo tài khoản thành công",
        content:res.success,
        type:"success",
        handlePress:()=>{
          setAlert(false)
          router.replace("/(tabs)/home")
        }
      })
    }
  };

  const [registerStep, setRegisterStep] = useState(1);

  const renderRegisterStep = () => {
    switch (registerStep) {
      case 1:
        return (
          <RegisterFirst
            userData={userData}
            setUserData={setUserData}
            setRegisterStep={setRegisterStep}
          />
        );
      case 2:
        return (
          <RegisterSecond
            userData={userData}
            setUserData={setUserData}
            setRegisterStep={setRegisterStep}
            handleRegister={handleRegister}
          />
        );

      default:
        return router.replace("/(tabs)/home");
    }
  };



  return (
    <SafeAreaView
      className="flex-1 items-center justify-center "
      style={{
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {renderRegisterStep()}
      <Pressable className="mt-10" onPress={() => router.replace("/login")}>
        <Text className="text-textColor">
          Đã có tài khoản ?{" "}
          <Text className="text-primary font-bold">Đăng nhập.</Text>
        </Text>
      </Pressable>
      {alert && <ModalAlert alert={alert}/>}
     
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
