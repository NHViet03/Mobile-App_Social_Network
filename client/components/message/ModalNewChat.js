import { Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import CardMessage from "./CardMessage";
import Loading from "../Loading";

import { useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";

const ModalNewChat = ({ handleCloseNewChatModal }) => {
  const auth = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchUsers = async () => {
      setLoading(true);
      const res = await getDataAPI(
        `search_users?username=${search}`,
        auth.token
      );
      setUsers(res.data.users);
      setLoading(false);
    };

    searchUsers();
  }, [search, auth.token]);

  const handleSelectUser = (user) => {
    setUserSelected(user);
  };

  const handleSubmit = () => {
    if (Object.keys(userSelected).length === 0) return;
    router.push({
      pathname: "/message/chatBox",
      params: {
        userId: userSelected._id,
        avatar: userSelected.avatar,
        username: userSelected.username,
        fullname: userSelected.fullname,
      },
    });
    handleCloseNewChatModal();
  };

  return (
    <View className="flex-1">
      <View className="border-b-[1px] border-b-borderColor pb-3">
        <Text className="font-bold text-lg text-center">Tin nhắn mới</Text>
      </View>
      <View className="mt-3 mx-3 ">
        <View className="flex-row mb-3 items-center">
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
              marginRight: 12,
            }}
          >
            Đến
          </Text>
          {Object.keys(userSelected).length > 0 && (
            <View className="px-3 py-2 rounded-full bg-primary">
              <Text className=" text-medium text-white">
                {userSelected.fullname}
              </Text>
            </View>
          )}
        </View>
        <TextInput
          className="px-3 py-2"
          placeholder="Tìm kiếm"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <Text className="font-bold text-base ml-3 mb-3">Gợi ý</Text>

      {loading && <Loading />}
      <BottomSheetFlatList
        scrollEnabled={true}
        className="flex-1 my-2 "
        data={users}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            className="ml-4 mb-3"
            onPress={() => handleSelectUser(item)}
          >
            <CardMessage
              user={item}
              isChecked={userSelected._id === item._id ? true : false}
            />
          </Pressable>
        )}
      />
      <Pressable
        className="mb-1 mt-1 p-3 border-t-borderColor border-t-[0.5px] "
        disabled={Object.keys(userSelected).length > 0 ? false : true}
        onPress={handleSubmit}
      >
        <View
          className={`bg-primary rounded-lg py-3  ${
            Object.keys(userSelected).length > 0 ? "opacity-100" : "opacity-50"
          }`}
        >
          <Text className="font-semibold text-base text-white text-center">
            Tạo đoạn chat mới
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ModalNewChat;
