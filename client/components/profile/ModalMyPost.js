import {
    View,
    Text,
    Pressable,
    Image,
    Dimensions,
  } from "react-native";
  import { ScrollView } from "react-native-virtualized-view";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import {
    FontAwesome5,
    Entypo,
  } from "@expo/vector-icons";
  import ImageGallery from "../search/ImageGallery";
  import Avatar from "../Avatar";
  import SearchContent from "../search/SearchContent";
  
  const ModalMyPost = () => {
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
  
  export default ModalMyPost;
  