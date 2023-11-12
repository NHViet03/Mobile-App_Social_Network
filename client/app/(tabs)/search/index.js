import {
  View,
  Text,
  StatusBar,
  Pressable,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import ImageGallery from "../../../components/search/ImageGallery";
import Avatar from "../../../components/Avatar";
import SearchContent from "../../../components/search/SearchContent";

const index = () => {
  const { posts, users } = useSelector((state) => state.homePosts);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(users);

  const [postPicker, setPostPicker] = useState(null);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const handlePickPost = (image) => {
    setPostPicker(image);
  };

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

  const handleBack = () => {
    setIsOpenSearch(false);
    setSearch("");
  };

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <Pressable className="flex-row items-center mx-3 mt-3 mb-3" style={{
        marginTop:StatusBar.currentHeight+12
      }}>
        {isOpenSearch && (
          <Pressable className="ml-2 mr-3" onPress={handleBack}>
            <MaterialIcons name="keyboard-backspace" size={30} color="black" />
          </Pressable>
        )}
        <View className=" flex-1 px-1 py-[6px] rounded-lg flex-row items-center justify-between bg-inputColor">
          <MaterialCommunityIcons name="magnify" size={24} color="black" />

          <TextInput
            placeholder="Tìm kiếm"
            className="flex-1 mx-2"
            onTouchStart={() => setIsOpenSearch(true)}
            value={search}
            onChangeText={handleSearch}
          />
        </View>
      </Pressable>

      {isOpenSearch ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchContent users={searchResult} />
        </ScrollView>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} className="mb-3">
            <ImageGallery posts={posts} handlePickPost={handlePickPost} />
          </ScrollView>

          {postPicker && (
            <Pressable
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 100,
                backgroundColor: "rgba(0,0,0,0.4)",
              }}
              onPress={() => handlePickPost(null)}
            >
              <View
                style={{
                  width: 340,
                  height: 450,
                  position: "absolute",
                  top: windowHeight / 2 - 225,
                  left: windowWidth / 2 - 170,
                  backgroundColor: "#fff",
                  elevation: 10,
                  borderRadius: 12,
                }}
              >
                <View className="flex-row mx-3 py-2 items-center">
                  <Avatar avatar={postPicker.user.avatar} size="middle" />
                  <Text className="font-semibold ml-2">
                    {postPicker.user.username}
                  </Text>
                </View>
                <View className="flex-1">
                  <Image
                    source={{
                      uri: postPicker.images[0].url,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
                <View className="flex-row py-3 items-center justify-around">
                  <FontAwesome5 name="heart" size={24} color="black" />
                  <FontAwesome5 name="user-circle" size={24} color="black" />
                  <FontAwesome5 name="paper-plane" size={24} color="black" />
                  <Entypo name="dots-three-vertical" size={24} color="black" />
                </View>
              </View>
            </Pressable>
          )}
        </>
      )}
    </View>
  );
};

export default index;
