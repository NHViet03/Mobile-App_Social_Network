import { Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import CardShare from "./postCard/CardShare";

const ModalSharePost = () => {
  const sharePostModal = useSelector((state) => state.sharePostModal);
  const { users } = useSelector((state) => state.homePosts);
  const [usersSelected, setUsersSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(users);

  const handleSearch = (text) => {
    const formatText = text.trim().toLowerCase();
    setSearch(text);
    setSearchResult(
      users.filter(
        (user) =>
          user.username.trim().toLowerCase().includes(formatText) ||
          user.fullname.trim().toLowerCase().includes(formatText)
      )
    );
  };

  const handleSelectUser = (user) => {
    if (!usersSelected.find((item) => item._id === user._id)) {
      setUsersSelected([...usersSelected, user]);
    } else {
      setUsersSelected(usersSelected.filter((item) => item._id !== user._id));
    }
  };

  return (
    <View className="flex-1">
      <View className="mx-3 mt-4 mb-3 px-1 py-[6px] rounded-lg flex-row items-center justify-between bg-inputColor">
        <View className="flex-1 ml-2 flex-row items-center">
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
          <TextInput
            placeholder="Tìm kiếm"
            className="flex-1 mx-2"
            value={search}
            onChangeText={handleSearch}
          />
        </View>
        <AntDesign name="addusergroup" size={24} color="black" />
      </View>
      <BottomSheetFlatList
        scrollEnabled={true}
        className="flex-1 my-2 "
        data={searchResult}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            className="mx-3 mb-3"
            onPress={() => handleSelectUser(item)}
          >
            <CardShare
              user={item}
              isChecked={
                usersSelected.find((user) => user._id === item._id)
                  ? true
                  : false
              }
            />
          </Pressable>
        )}
      />
      <Pressable className="mb-1 mt-1 p-3 border-t-borderColor border-t-[0.5px] ">
        <View
          className={`bg-primary rounded-lg py-3  ${
            usersSelected.length > 0 ? "opacity-100" : "opacity-50"
          }`}
        >
          <Text className="font-semibold text-base text-white text-center">
            Gửi
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ModalSharePost;
