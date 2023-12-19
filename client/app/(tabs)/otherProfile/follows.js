import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useRouter, useLocalSearchParams } from "expo-router";

import { Feather } from "@expo/vector-icons";
import Loading from "../../../components/Loading";
import FollowList from "../../../components/profile/FollowList";

import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";
import { deleteFollower } from "../../../redux/actions/userAction";

const Follows = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { type, id, username } = useLocalSearchParams();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isShowFollowers, setIsShowFollowers] = useState(
    type === "followers" ? true : false
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowData = async () => {
      if (followers.length > 0 && following.length > 0) return;

      setLoading(true);
      if (isShowFollowers && followers.length === 0) {
        const res = await getDataAPI(`user_followers/${id}`, auth.token);
        setFollowers(res.data.followers);
      } else if (!isShowFollowers && following.length === 0) {
        const res = await getDataAPI(`user_following/${id}`, auth.token);
        setFollowing(res.data.following);
      }
      setLoading(false);
    };

    getFollowData();
  }, [
    auth.token,
    auth.user._id,
    followers.length,
    following.length,
    isShowFollowers,
  ]);

  const width = Dimensions.get("window").width;
  const flatListRef = useRef(null);

  const handleChangeShowFollowers = (value) => {
    setIsShowFollowers(value);
    const index = value ? 0 : 1;
    flatListRef.current.scrollToIndex({ animated: false, index });
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
          marginTop: StatusBar.currentHeight,
          flex: 1,
        }}
      >
        <View className="mt-4 flex flex-row items-center px-3" class>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text className="ml-5 font-bold text-[20px]">{username}</Text>
        </View>
        <View className="mt-5 flex-1">
          <View className="flex-row justify-between">
            <View
              className={`flex-1 border-b-[1px] pb-2 ${
                isShowFollowers
                  ? "border-b-dark-dark_80"
                  : "border-b-borderColor"
              }`}
            >
              <Pressable onPress={() => handleChangeShowFollowers(true)}>
                <Text
                  className={`text-center font-bold ${
                    isShowFollowers ? "text-dark" : "text-textColor"
                  }`}
                >
                  Người theo dõi: {followers.length}
                </Text>
              </Pressable>
            </View>
            <View
              className={`flex-1 border-b-[1px] pb-2 ${
                !isShowFollowers
                  ? "border-b-dark-dark_80"
                  : "border-b-borderColor"
              }`}
            >
              <Pressable onPress={() => handleChangeShowFollowers(false)}>
                <Text
                  className={`text-center font-bold ${
                    !isShowFollowers ? "text-dark" : "text-textColor"
                  }`}
                >
                  Đang theo dõi: {following.length}
                </Text>
              </Pressable>
            </View>
          </View>
          <FlatList
            ref={flatListRef}
            data={[followers, following]}
            horizontal={true}
            numColumns={1}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            initialScrollIndex={isShowFollowers ? 0 : 1}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={(event) => {
              const x = event.nativeEvent.contentOffset.x;
              setIsShowFollowers(!Math.round(x / width) > 0);
            }}
            renderItem={({ item, index }) => (
              <ScrollView
                style={{
                  flex: 1,
                  width: width,
                }}
                key={index}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <View className="mt-4 px-4 flex-1">
                    <Text className="font-medium text-base mb-4">
                      Tất cả người{" "}
                      {isShowFollowers ? "theo dõi" : "đang theo dõi"}
                    </Text>
                    <FollowList users={item} />
                  </View>
                )}
              </ScrollView>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Follows;
