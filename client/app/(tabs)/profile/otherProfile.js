import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Pressable,
  } from "react-native";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import { router } from "expo-router";
  import { Ionicons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
  import { Octicons } from "@expo/vector-icons";
  import Avatar from "../../../components/Avatar";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
  import { useCallback, useMemo, useRef } from "react";
  import { useDispatch } from "react-redux";
  import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
  import ModalLogOut from "../../../components/profile/ModalLogOut";
  import ModalMyPost from "../../../components/profile/ModalMyPost";
  
  const OtherProfile = () => {
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
    const [isFollowing, setIsFollowing]= useState(true)
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
          <Pressable onPress={() => router.push("/profile/following")}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>
          <View>
            <TouchableOpacity onPress={handleOpenLogOutModal}>
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
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            {/* Logo User, Name and info following, follower, post */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Logo User, Name */}
              <View
                style={{
                  marginLeft: 10,
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
                gap: 10,
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
                  12
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
                  765
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                  }}
                >
                  Người theo dõi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
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
                  860
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                  }}
                >
                  Đang theo dõi
                </Text>
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
            }}
          >
            <TouchableOpacity
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isFollowing ? "#DDDD" : "#c43302",
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 30,
                width: 160,
                marginLeft: 10,
              }}
              onPress={()=> setIsFollowing(!isFollowing)}
            
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: isFollowing? "#000" : "#ffff",
                }}
              >
               {isFollowing ? "Đang theo dõi" : "Theo dõi"}
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DDDD",
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 30,
                width: 160,
                marginRight: 10,
              }}
              onPress={() => router.push("/message/chat")}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
               Nhắn tin
              </Text>
            </TouchableOpacity>
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
                <Text><ModalMyPost /></Text>
              </View>
            )}
          </View>
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
        </ScrollView>
      </View>
    );
  };
  
  export default OtherProfile;
  
  const styles = StyleSheet.create({});
  