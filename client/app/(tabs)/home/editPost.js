import { StyleSheet, Text, View, Pressable, StatusBar, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Avatar from "../../../components/Avatar";
import { updatePost } from "../../../redux/actions/postAction";

const editPost = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const {post, onEdit} = homePosts
  
  const [editPost, setEditPost] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (onEdit) {
      setEditPost(post);
    }
  }, [onEdit, post]);


const handleDone = () => {
  console.log("Bấm Xong")
  dispatch(updatePost({editPost, auth}))
  router.push("/home")
}

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
    {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 16,
        }}
      >
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.push("/home")}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text className=" text-center font-bold text-xl"
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
           Chỉnh sửa bài viết
          </Text>
        </View>
        <TouchableOpacity>
        <Pressable onPress={handleDone}>
           <Text className="text-base "
           style={{
            color: "#f16c2e",
            fontSize: 17,
           }} >Xong</Text>
          </Pressable>
        </TouchableOpacity>
      </View>

      {/* Nội dung chỉnh sửa ở đây */}
      <View>
      <View className="justify-between flex-row items-center p-3 ">
        <Avatar avatar={auth.user.avatar} size="middle" />
        <TextInput
          placeholder="Viết chú thích..."
          multiline={true}
          className="flex-1 mx-2"
          value={editPost?.content}
          onChangeText={(text) =>
            setEditPost({
              ...editPost,
              content: text,
            })
          }
        />
        <Image
          source={{
            uri: editPost && editPost.images && editPost.images[0] ? editPost.images[0].url : '',

            // uri:  '',   //editPost ? editPost?.images[0]?.url:
          }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 4,
          }}
        />
      </View>
      <Text className="mt-1 pb-2 px-3 text-right text-textColor ">
        {editPost?.content?.length}/200
      </Text>
      <View className="mt-3">
        <View className="justify-between flex-row px-3 py-3  border-y-borderColor border-y-[0.5px]">
          <Text className="text-base">Đối tượng</Text>
          <Text className="text-textColor">Mọi người</Text>
        </View>
      </View>
    </View>

    </View>
  );
};

export default editPost;

const styles = StyleSheet.create({});
