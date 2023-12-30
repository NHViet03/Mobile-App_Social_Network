import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import uuid from "react-native-uuid";
import Avatar from "./Avatar";
import CardComment from "./postCard/CardComment";
import { KeyboardAvoidingView, Platform } from "react-native";
import { createComment } from "../redux/actions/commentAction";
import { MaterialIcons } from '@expo/vector-icons';
const ModalComment = () => {
  const auth = useSelector((state) => state.auth);
  const commentModal = useSelector((state) => state.commentModal);
  const [postData, setPostData] = useState({});
  const [content, setContent] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [indexActive, setIndexActive] = useState(-1);
  const [commentSelected, setCommentSelected] = useState(false);
  
  useEffect(() =>
  {
    setPostData(commentModal);
  },[commentModal]);
  if (!postData) {
    return <View></View>;
  }
  const dispatch = useDispatch();
  const handleComment = () => {
    if(content.trim() === '') return;
    const newComment = {
      _id: uuid.v4(),
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };

    setPostData({
      ...postData,
      comments: [...postData.comments, newComment],
    });
    setContent("");
    dispatch(createComment({postData, content, auth }))
  };

  const handleSelectComment = (item, index) => {
    if (item.user._id === auth.user._id) {
      setIndexActive(index)
      setCommentSelected(item);
    }
    return;
  };

  const handleDeleteComment = () => {
    setPostData({
      ...postData,
      comments: postData.comments.filter(
        (comment) => comment._id !== commentSelected?._id
      ),
    });
    setCommentSelected(false);
  };

  const handleEdit = () => {
   
    setOnEdit(true)
  }

  return (
    <View className="flex-1">
      <View className="mt-4 pb-2 border-borderColor border-b-[0.5px]">
        {commentSelected ? (
          <View className="bg-primary flex-row items-center justify-between py-3 px-3">
            <Text className="text-white font-bold text-xl">Đã chọn 1 mục</Text>
            <View className="flex-row gap-3">
            <Pressable onPress={handleEdit}>
                <MaterialIcons name="mode-edit" size={28} color="white" />
              </Pressable>
              <Pressable onPress={handleDeleteComment}>
                <Ionicons name="trash-outline" size={28} color="white" />
              </Pressable>
              <Pressable onPress={() => setCommentSelected(false)}>
                <Ionicons name="close" size={28} color="white" />
              </Pressable>
            </View>
          </View>
        ) : (
          <Text className="font-semibold text-center ">Bình luận</Text>
        )}
      </View>
      {postData?.comments?.length > 0 ? (
        <BottomSheetFlatList
          className="flex-1 border-borderColor border-b-[0.5px]"
          data={postData.comments}
          scrollEnabled={true}
          numColumns={1}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => handleSelectComment(item, index)}
              onLongPress={() => handleSelectComment(item, index)}
              style={{
                backgroundColor:
                  commentSelected && commentSelected?._id === item._id
                    ? "#c433024d"
                    : "white",
              }}
            >
              <CardComment comment={item} index={index} onEdit={onEdit} setOnEdit={setOnEdit} postData={postData} indexActive={indexActive}   />
            </Pressable>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center  border-borderColor border-b-[0.5px]">
          <Text className="text-2xl font-bold mb-2">Chưa có bình luận</Text>
          <Text className="text-textColor">Bắt đầu trò chuyện.</Text>
        </View>
      )}

      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, position: 'absolute', bottom: 0, width: '100%' }}
      >
        <View className="flex-row items-center mb-2 px-4 py-3"
           >
          <Avatar avatar={auth.user.avatar} size="middle" />
          <TextInput
            className="flex-1 ml-3 mr-1 "
            placeholder={`Bình luận cho ${postData?.user?.username}...`}
            placeholderTextColor={{ color: "#9e9e9e" }}
            value={content}
            onChangeText={(text) => setContent(text)}
          />
          <Pressable onPress={handleComment}>
            <Text
              className={` text-primary ${
                content ? "opacity-100" : "opacity-50"
              } font-semibold text-base`}
            >
              Đăng
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ModalComment;

const styles = StyleSheet.create({});
