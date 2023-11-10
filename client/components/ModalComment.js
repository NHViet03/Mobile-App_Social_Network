import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import CardComment from "./postCard/CardComment";

const ModalComment = () => {
  const postData = useSelector((state) => state.commentModal);
  const auth = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  if(!postData){
    return <View></View>
  }

  return (
    <View className="flex-1">
      <View className="mt-4 pb-2 border-borderColor border-b-[0.5px]">
        <Text className="font-semibold text-center ">Bình luận</Text>
      </View>
      <ScrollView className="flex-1 border-borderColor border-b-[0.5px]">
        {postData.comments.map((comment, index) => (
          <CardComment key={index} comment={comment} />
        ))}
      </ScrollView>

      <View className="flex-row items-center mb-2 px-4 py-3">
        <Avatar avatar={auth.avatar} size="middle" />
        <TextInput
          className="flex-1 ml-3 "
          placeholder={`Bình luận cho ${postData.user.username}...`}
          placeholderTextColor={{ color: "#9e9e9e" }}
          value={content}
          onChangeText={(text) => setContent(text)}
        />
        <Pressable>
          <Text
            className={` text-primary ${
              content ? "opacity-100" : "opacity-50"
            } font-semibold text-base`}
          >
            Đăng
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalComment;

const styles = StyleSheet.create({});
