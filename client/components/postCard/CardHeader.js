import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import { PostContext } from "../../app/_layout";
import FollowBtn from "../FollowBtn";

const CardHeader = ({ post, showFollow }) => {
  const { user } = post;
  const { handleOpenReportPostModal } = useContext(PostContext);
  const dispatch = useDispatch();

  const handlePressReportPost = () => {
    dispatch({
      type: GLOBAL_TYPES.REPORT_POST_MODAL,
      payload: post,
    });
    handleOpenReportPostModal();
  };

  return (
    <View className="py-2 px-3 flex-row justify-between items-center">
      <Pressable
        className="flex-row items-center flex-1 mr-3"
        onPress={() =>
          router.push({
            pathname: "/(tabs)/otherProfile",
            params: { id: user._id },
          })
        }
      >
        <Avatar avatar={user.avatar} size="middle" />
        <Text className=" ml-[6px] font-bold ">{user.username}</Text>
      </Pressable>
      {showFollow && <FollowBtn user={user} />}
      <Pressable
        onPress={handlePressReportPost}
        style={{
          minWidth: 24,
          marginRight:-8
        }}
      >
        <Entypo name="dots-three-vertical" size={18} color="black" />
      </Pressable>
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({});
