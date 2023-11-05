import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import RegisterFirst from "../../components/register/RegisterFirst";
import RegisterSecond from "../../components/register/RegisterSecond";
import RegisterThird from "../../components/register/RegisterThird";

const register = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
    birthday: new Date(), 
  });

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
          />
        );
        case 3:
          return (
            <RegisterThird
              userData={userData}
              setUserData={setUserData}
              setRegisterStep={setRegisterStep}
            />
          );
      default:
        return router.replace("/login");
    }
  };

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center "
      style={{
        backgroundColor: "#fff",
      }}
    >
      
      {renderRegisterStep()}
      <Pressable className="mt-10" onPress={() => router.replace("/login")}>
        <Text className="text-textColor">
          Đã có tài khoản ? <Text className="text-primary font-bold">Đăng nhập.</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
