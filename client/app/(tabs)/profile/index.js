import { StyleSheet, Text, View, StatusBar } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";
import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../../../components/Avatar";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
import ModalLogOut from "../../../components/profile/ModalLogOut";
import ModalMyPost from "../../../components/profile/ModalMyPost";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const bottomSheetModalLogOut = useRef(null);
  const dispatch = useDispatch();

  const snapPointsLogOut = useMemo(() => ["25%"], []);

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
  const [selectedIcon, setSelectedIcon] = useState("grid");
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
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
              {auth.username}
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            paddingHorizontal: 10,
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
                marginLeft: 10,
                justifyContent: "center",
              }}
            >
              <Avatar size="large" avatar={auth.avatar}></Avatar>
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
              {auth.fullname}
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
                {auth.followers.length}
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
                {auth.following.length}
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
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DDDD",
              borderRadius: 6,
              paddingVertical: 6,
              width: 180,
              marginLeft: 12,
            }}
            onPress={() => router.push("/profile/editProfile")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Chỉnh sửa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DDDD",
              borderRadius: 6,
              paddingVertical: 6,
              width: 180,
              marginRight: 12,
            }}
            onPress={() => router.push("/profile/changePasswork")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",

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
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",

                borderBottomWidth: 1,
                borderColor:
                  selectedIcon === "bookmark" ? "#000000" : "#DDDDDD",
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

      <BottomSheetModal
        ref={bottomSheetModalLogOut}
        index={0}
        snapPoints={snapPointsLogOut}
        backgroundStyle={styles.modal}
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

export default index;

const styles = StyleSheet.create({});
