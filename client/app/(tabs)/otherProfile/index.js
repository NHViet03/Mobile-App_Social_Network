import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import {
  Entypo,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-virtualized-view";
import Avatar from "../../../components/Avatar";

import ModalMyPost from "../../../components/profile/ModalMyPost";

const OtherProfile = () => {
  const router=useRouter();
  const dispatch = useDispatch();

  const [selectedIcon, setSelectedIcon] = useState("grid");
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };
  const [isFollowing, setIsFollowing] = useState(true);
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
          justifyContent: "space-between",
          flexDirection: "row",
          height: 50,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
        <View>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              John Doe
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
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginEnd: 10,
            }}
          >
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,

            marginTop: 12,
            marginEnd: 12,
          }}
        >
          {/* Logo User, Name and info following, follower, post */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Logo User, Name */}
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Avatar
                size="large"
                avatar="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
              ></Avatar>
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: 500,
                marginLeft: 5,
                marginTop: 5,
              }}
            >
              {" "}
              Nguyễn Hoàng Việt
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
            }}
          >
            {/* post, following, follwer */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {0}
              </Text>
              <Text>Bài viết</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/profile/following")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {12}
              </Text>
              <Text>Người the...</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile/following")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {3}
              </Text>
              <Text>Đang the...</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Button */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            gap: 8,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: isFollowing ? "#DDDD" : "#c43302",
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 30,
              }}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 600,

                  color: isFollowing ? "#000" : "#ffff",
                }}
              >
                {isFollowing ? "Đang theo dõi" : "Theo dõi"}
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
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 30,
              }}
              onPress={() => router.push("/message/chat")}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Nhắn tin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 80,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: selectedIcon === "grid" ? "#000000" : "#DDDDDD",
            }}
            onPress={() => handleIconPress("grid")}
          >
            <MaterialCommunityIcons
              name="grid"
              size={24}
              color={selectedIcon === "grid" ? "#000000" : "#DDDDDD"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 80,
              borderBottomWidth: 1,
              borderColor: selectedIcon === "bookmark" ? "#000000" : "#DDDDDD",
              paddingBottom: 10,
            }}
            onPress={() => handleIconPress("bookmark")}
          >
            <Feather
              name="bookmark"
              size={24}
              color={selectedIcon === "bookmark" ? "#000000" : "#DDDDDD"}
            />
          </TouchableOpacity>
        </View>
        <View>
          {selectedIcon === "grid" ? (
            <View>
              <ModalMyPost />
            </View>
          ) : (
            <View>
              <Text>
                <ModalMyPost />
              </Text>
            </View>
          )}
        </View>
       
      </ScrollView>
    </View>
  );
};

export default OtherProfile;

const styles = StyleSheet.create({});
