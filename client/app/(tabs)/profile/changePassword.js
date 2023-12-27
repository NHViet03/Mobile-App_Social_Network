import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Feather, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import ModalAlert from "../../../components/ModalAlert";

import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../../../redux/actions/userAction";

const changePasswork = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    cf_newPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    let errs = {};
    if (passwords.newPassword.length < 6) {
      errs.newPassword = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (passwords.cf_newPassword !== passwords.newPassword) {
      errs.cf_newPassword = "Mật khẩu không khớp";
    }

    if (Object.keys(errs).length > 0) return setErrors(errs);
    setLoading(true);
    const res = await dispatch(changePassword({ passwords, auth }));

    if (res?.error) {
      setAlert({
        title: "Đổi mật khẩu không thành công",
        content: res.error,
        type: "error",
        handlePress: () => setAlert(false),
      });
    }
    if (res.success) router.replace("/profile");
    setLoading(false);
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingHorizontal: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 16,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Đổi mật khẩu</Text>
        {loading ? (
          <ActivityIndicator size={28} color="#c43302" />
        ) : (
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        )}
      </View>
      <View className="pl-4 pr-5">
        <View className="flex-row items-center mb-4">
          <Text className="text-textColor font-medium">
            {auth.user.username}{" "}
          </Text>
          <Entypo name="dot-single" size={16} color="#737373" />
          <Text className="text-textColor font-medium">Dreamers</Text>
        </View>
        <Text className="mb-4 text-[15px]">
          Bạn sẽ được đăng xuất khỏi tất cả các thiết bị khác khi đổi mật
          khẩu(trừ phiên bản này) để bảo vệ tài khoản của bạn, phòng khi ai đó
          đang cố lấy quyền truy cập.
        </Text>
        <Text className="mb-5 text-[15px]">
          Mật khẩu của bạn phải có ít nhất 6 ký tự, bao gồm cả chữ và số, chữ
          cái và kí tự đặc biệt(!%@%).
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#DDDDDD",
            marginBottom: 16,
          }}
          placeholder="Mật khẩu hiện tại"
          value={passwords.currentPassword}
          onChangeText={(text) =>
            setPasswords({
              ...passwords,
              currentPassword: text,
            })
          }
          secureTextEntry={true}
        />
        <View className="mb-4">
          <TextInput
            style={{
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#DDDDDD",
            }}
            placeholder="Mật khẩu mới"
            secureTextEntry={true}
            value={passwords.newPassword}
            onChangeText={(text) =>
              setPasswords({
                ...passwords,
                newPassword: text,
              })
            }
          />
          {errors.newPassword && (
            <Text className="text-primary text-[13px]">
              *{errors.newPassword}
            </Text>
          )}
        </View>
        <View className="mb-4">
          <TextInput
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#DDDDDD",
            }}
            placeholder="Nhập lại mật khẩu"
            secureTextEntry={true}
            value={passwords.cf_newPassword}
            onChangeText={(text) =>
              setPasswords({
                ...passwords,
                cf_newPassword: text,
              })
            }
          />
          {errors.cf_newPassword && (
            <Text className="text-primary text-[13px]">
              *{errors.cf_newPassword}
            </Text>
          )}
        </View>
        <Text className="text-[13px] text-primary">Bạn quên mật khẩu ư?</Text>

        <Pressable
          className="mt-10 bg-primary rounded-full w-100 py-[10px]"
          onPress={handleSubmit}
        >
          <Text className="text-base font-medium text-white text-center">
            Đổi mật khẩu
          </Text>
        </Pressable>
      </View>
      {alert && <ModalAlert alert={alert} />}
    </View>
  );
};

export default changePasswork;
