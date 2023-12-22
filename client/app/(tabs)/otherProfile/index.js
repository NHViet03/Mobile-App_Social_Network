import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Image,
  FlatList,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useRouter, useLocalSearchParams, Redirect } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Avatar from "../../../components/Avatar";
import Loading from "../../../components/Loading";
import PostList from "../../../components/profile/PostList";
import FollowBtn from "../../../components/FollowBtn";

import { useSelector } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const { id } = useLocalSearchParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [postPicker, setPostPicker] = useState(null);
  const [loadPost, setLoadPost] = useState(false);

  const router = useRouter();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const getUser = async () => {
      try {
        setPosts([]);
        const res = await getDataAPI(`user/${id}`, auth.token);
        setUser(res.data.user);
      } catch (error) {}
    };

    getUser();
  }, [auth.token, id]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (posts.length > 0) return;

        setLoadPost(true);
        const res = await getDataAPI(`user_posts/${id}`, auth.token);
        setPosts(res.data.posts);

        setLoadPost(false);
      } catch (error) {}
    };
    getPosts();
  }, [auth.token, id, posts.length]);

  const handlePickPost = (image) => {
    setPostPicker(image);
  };

  const handleOpenURL = useCallback(async () => {
    const supported = await Linking.canOpenURL(user.website);

    if (supported) {
      await Linking.openURL(user.website);
    }
  }, [user.website]);

  if (auth.user._id === id) return <Redirect href="/profile" />;
  if (Object.keys(user).length === 0) return <Loading />;

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 50,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
        }}
      >
        <View className="flex-row items-center ">
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            {user.username}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator="false">
        <View className="mt-5 px-4">
          <View className="flex flex-row justify-between items-center">
            <Avatar avatar={user.avatar} size="large" />
            <View className="flex flex-row gap-3">
              <View className="flex items-center">
                <Text className="font-bold text-lg">{posts.length}</Text>
                <Text>Bài viết</Text>
              </View>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/otherProfile/follows",
                    params: {
                      type: "followers",
                      id: user._id,
                      username: user.username,
                    },
                  })
                }
              >
                <View className="flex items-center">
                  <Text className="font-bold text-lg">
                    {user.followers.length}
                  </Text>
                  <Text>Người the...</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/otherProfile/follows",
                    params: {
                      type: "following",
                      id: user._id,
                      username: user.username,
                    },
                  })
                }
              >
                <View className="flex items-center">
                  <Text className="font-bold text-lg">
                    {user.following.length}
                  </Text>
                  <Text>Đang theo...</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View className="mt-1">
            <Text className="font-medium">{user.fullname}</Text>
            <Text className="">{user.story}</Text>
            {user.website && (
              <Pressable
                onPress={handleOpenURL}
                className="flex-row items-center"
              >
                <MaterialIcons name="facebook" size={20} color="#1877F2" />
                <Text className="text-[#1877F2] text-[13px] ml-1">
                  {user.website}
                </Text>
              </Pressable>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
              marginTop: 16,
              gap: 8,
            }}
          >
            <FollowBtn user={user} showFull />

            <View className="flex-1">
              <Pressable
                style={{
                  backgroundColor: "#eeeeee",
                  borderRadius: 6,
                  paddingVertical: 8,
                }}
                onPress={() => {
                  router.push({
                    pathname: "/message/chatBox",
                    params: {
                      userId: user._id,
                      avatar: user.avatar,
                      username: user.username,
                      fullname: user.fullname,
                    },
                  });
                }}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Nhắn tin
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="mt-4 flex flex-1">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <View className="flex-1">
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "#000000",
                }}
              >
                <MaterialCommunityIcons
                  name="grid"
                  size={24}
                  color="#000000"
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderColor: "#DDDDDD",
                  paddingBottom: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="presentation-play"
                  size={24}
                  color="#DDDDDD"
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={{
              flex: 1,
              width: windowWidth,
              minHeight: windowHeight,
            }}
            showsVerticalScrollIndicator={false}
          >
            {loadPost ? (
              <Loading />
            ) : (
              <PostList posts={posts} handlePickPost={handlePickPost} />
            )}
          </ScrollView>
        </View>
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
    </View>
  );
};

export default Profile;
