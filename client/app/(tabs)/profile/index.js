import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
import { useRouter } from "expo-router";
import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Avatar from "../../../components/Avatar";
import ModalLogOut from "../../../components/profile/ModalLogOut";
import Loading from "../../../components/Loading";
import PostList from "../../../components/profile/PostList";

import { useSelector, useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
import { getDataAPI } from "../../../utils/fetchData";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isShowPosts, setIsShowPosts] = useState(true);
  const [postPicker, setPostPicker] = useState(null);
  const [loading, setLoading] = useState(false);

  const bottomSheetModalLogOut = useRef(null);
  const router = useRouter();
  const snapPointsLogOut = useMemo(() => ["25%"], []);
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const flatListRef = useRef(null);

  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (posts.length > 0 && savedPosts.length > 0) return;

        setLoading(true);
        if (isShowPosts && posts.length === 0) {
          const res = await getDataAPI(`user_posts/${user._id}`, auth.token);
          setPosts(res.data.posts);
        } else if (!isShowPosts && savedPosts.length === 0) {
          const res = await getDataAPI(`saved_posts/${user._id}`, auth.token);
          setSavedPosts(res.data.posts);
        }
        setLoading(false);
      } catch (error) {}
    };
    getPosts();
  }, [auth.token, user._id, posts.length, savedPosts.length, isShowPosts]);

  const handleOpenLogOutModal = useCallback(() => {
    bottomSheetModalLogOut.current?.present();
  }, []);

  const handleCloseLogOutModal = () => {
    dispatch({
      type: GLOBAL_TYPES.LOGOUT_MODAL,
      payload: false,
    });
    bottomSheetModalLogOut.current?.dismiss();
  };

  const handlePickPost = (image) => {
    setPostPicker(image);
  };

  const handleOpenURL = useCallback(async () => {
    const supported = await Linking.canOpenURL(user.website);

    if (supported) {
      await Linking.openURL(user.website);
    }
  }, [user.website]);

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
          paddingHorizontal: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 50,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <TouchableOpacity onPress={handleOpenLogOutModal}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {user.username}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/add")}>
            <Octicons name="diff-added" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="ios-reorder-three-outline"
              size={35}
              color="black"
            />
          </TouchableOpacity>
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
                    pathname: "/profile/follows",
                    params: { type: "followers" },
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
                    pathname: "/profile/follows",
                    params: { type: "following" },
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
            <Text>{user.story}</Text>
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
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DDDD",
                  borderRadius: 6,
                  paddingVertical: 8,
                }}
                onPress={() => router.push("/profile/editProfile")}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Chỉnh sửa trang cá nh...
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#DDDD",
                  borderRadius: 6,
                  paddingVertical: 8,
                }}
                onPress={() => router.push("/profile/changePassword")}
              >
                <Text
                  style={{
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Đổi mật khẩu
                </Text>
              </TouchableOpacity>
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
                  borderColor: isShowPosts ? "#000000" : "#DDDDDD",
                }}
                onPress={() => setIsShowPosts(true)}
              >
                <MaterialCommunityIcons
                  name="grid"
                  size={24}
                  color={isShowPosts ? "#000000" : "#DDDDDD"}
                />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1,
                  borderColor: !isShowPosts ? "#000000" : "#DDDDDD",
                  paddingBottom: 10,
                }}
                onPress={() => setIsShowPosts(false)}
              >
                <Feather
                  name="bookmark"
                  size={24}
                  color={!isShowPosts ? "#000000" : "#DDDDDD"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            ref={flatListRef}
            data={[posts, savedPosts]}
            horizontal={true}
            numColumns={1}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            initialScrollIndex={isShowPosts ? 0 : 1}
            getItemLayout={(data, index) => ({
              length: windowWidth,
              offset: windowWidth * index,
              index,
            })}
            onScroll={(event) => {
              const x = event.nativeEvent.contentOffset.x;
              setIsShowPosts(!Math.round(x / windowWidth) > 0);
            }}
            renderItem={({ item, index }) => (
              <ScrollView
                style={{
                  flex: 1,
                  width: windowWidth,
                  minHeight: windowHeight,
                }}
                showsVerticalScrollIndicator={false}
                key={index}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <PostList posts={item} handlePickPost={handlePickPost} profile />
                )}
              </ScrollView>
            )}
          />
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
      <BottomSheetModal
        ref={bottomSheetModalLogOut}
        index={0}
        snapPoints={snapPointsLogOut}
        onDismiss={() => handleCloseLogOutModal()}
        onChange={(index) => {
          if (index === -1) {
            handleCloseLogOutModal();
          }
        }}
      >
        <ModalLogOut handleCloseLogOutModal={handleCloseLogOutModal} />
      </BottomSheetModal>
    </View>
  );
};

export default Profile;
