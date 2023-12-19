import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import CheckBox from "react-native-check-box";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../../../components/Avatar";

import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../../redux/actions/userAction";

const editProfile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    avatar: "",
    fullname: "",
    username: "",
    gender: "male",
    story: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  const pickImageAsync = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (!image.canceled) {
      setUser({ ...user, avatar: image.assets[0] });
    } else {
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await dispatch(updateProfile({ newUser: user, auth }));
    setLoading(false);
    router.replace("/profile");
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
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 24,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            paddingVertical: 12,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Chỉnh sửa trang cá nhân
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size={28} color="#c43302" />
        ) : (
          <TouchableOpacity onPress={handleSubmit}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#c43302",
              }}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "collumn",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 36,
        }}
        onPress={pickImageAsync}
      >
        <Avatar
          size="large"
          avatar={user.avatar.uri ? user.avatar.uri : user.avatar}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "#c43302",
            marginTop: 12,
          }}
        >
          Chỉnh sửa ảnh hoặc avatar
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pl-4 pr-3">
          <View className="mb-3">
            <Text className="mb-1 text-[13px] text-textColor">Tên</Text>
            <TextInput
              className="border-b-[1px] border-b-borderColor pb-1 text-[16px] "
              value={user.fullname}
              onChangeText={(text) => setUser({ ...user, fullname: text })}
            />
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-[13px] text-textColor">
              Tên người dùng
            </Text>
            <TextInput
              className="border-b-[1px] border-b-borderColor pb-1 text-[16px] "
              value={user.username}
              onChangeText={(text) => setUser({ ...user, username: text })}
            />
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-[13px] text-textColor">Tiểu sử</Text>
            <TextInput
              className="border-b-[1px] border-b-borderColor pb-1 text-[16px] "
              value={user.story}
              multiline
              onChangeText={(text) => setUser({ ...user, story: text })}
            />
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-[13px] text-textColor">Liên kết</Text>
            <TextInput
              className="border-b-[1px] border-b-borderColor pb-1 text-[16px] text-primary "
              value={user.website}
              onChangeText={(text) => setUser({ ...user, website: text })}
            />
          </View>
          <View className="mb-3">
            <Text className="mb-1 text-[13px] text-textColor">Giới tính</Text>
            <View className="flex-row justify-center items-center border-b-[1px] border-b-borderColor pb-1">
              <View className="flex-row mr-3">
                <Text
                  className={`text-[16px] mr-2 ${
                    user.gender === "male" && "text-primary"
                  }`}
                >
                  Nam
                </Text>
                <CheckBox
                  checkBoxColor="#000"
                  checkedCheckBoxColor="#c43302"
                  isChecked={user.gender === "male"}
                  onClick={() => {
                    setUser({
                      ...user,
                      gender: "male",
                    });
                  }}
                />
              </View>
              <View className="flex-row mr-3">
                <Text
                  className={`text-[16px] mr-2 ${
                    user.gender === "female" && "text-primary"
                  }`}
                >
                  Nữ
                </Text>
                <CheckBox
                  checkBoxColor="#000"
                  checkedCheckBoxColor="#c43302"
                  isChecked={user.gender === "female"}
                  onClick={() => {
                    setUser({
                      ...user,
                      gender: "female",
                    });
                  }}
                />
              </View>
              <View className="flex-row ">
                <Text
                  className={`text-[16px] mr-2 ${
                    user.gender === "unknown" && "text-primary"
                  }`}
                >
                  Không muốn tiết lộ
                </Text>
                <CheckBox
                  checkBoxColor="#000"
                  checkedCheckBoxColor="#c43302"
                  isChecked={user.gender === "unknown"}
                  onClick={() => {
                    setUser({
                      ...user,
                      gender: "unknown",
                    });
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default editProfile;
