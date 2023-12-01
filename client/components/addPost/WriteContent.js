import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";

const WriteContent = ({ post, setPost }) => {
  const auth = useSelector((state) => state.auth);

  return (
    <View>
      <View className="justify-between flex-row items-center p-3 ">
        <Avatar avatar={auth.user.avatar} size="middle" />
        <TextInput
          placeholder="Viết chú thích..."
          multiline={true}
          className="flex-1 mx-2"
          value={post.content}
          onChangeText={(text) =>
            setPost({
              ...post,
              content: text,
            })
          }
        />
        <Image
          source={{
            uri: post ? post.images[0].uri: '',
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 4,
          }}
        />
      </View>
      <Text className="mt-1 pb-2 px-3 text-right text-textColor ">
        {post.content.length}/200
      </Text>
      <View className="mt-3">
        <View className="justify-between flex-row px-3 py-3  border-y-borderColor border-y-[0.5px]">
          <Text className="text-base">Đối tượng</Text>
          <Text className="text-textColor">Mọi người</Text>
        </View>
      </View>
    </View>
  );
};

export default WriteContent;

const styles = StyleSheet.create({});
