import React, { useState} from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-virtualized-view";
import {useRouter} from 'expo-router'
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import FollowerCard from "../../../components/profile/followerCard";
import FollowingCard from "../../../components/profile/followingCard";

const following = () => {
  const auth = useSelector((state) => state.auth);
  const router=useRouter();

  const [selectedfollow, setselectedfollow] = useState("following");
  const handleIconPress = (follow) => {
    setselectedfollow(follow);
  };
  const [modalVisible, setModalVisible] = useState(false);
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
          paddingHorizontal: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            {auth.username}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor:
                selectedfollow === "following" ? "#000000" : "#DDDDDD",
            }}
            onPress={() => handleIconPress("following")}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: selectedfollow === "following" ? "#000000" : "#DDDDDD",
              }}
            >
              Người theo dõi
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor:
                selectedfollow === "follower" ? "#000000" : "#DDDDDD",
              paddingBottom: 10,
            }}
            onPress={() => handleIconPress("follower")}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: selectedfollow === "follower" ? "#000000" : "#DDDDDD",
              }}
            >
              Đang theo dõi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {selectedfollow === "following" ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            <Text
              style={{
                marginStart: 12,
                marginTop: 12,
                marginBottom: 12,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Tất cả người theo dõi
            </Text>
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            <FollowerCard />
            {/* Modal Alert */}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            <Text
              style={{
                marginStart: 12,
                marginTop: 12,
                marginBottom: 12,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Bạn theo dõi
            </Text>
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
            <FollowingCard />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default following;
