import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import LikeBtn from "../LikeBtn";

const CardComment = ({ comment }) => {
    const auth=useSelector(state=>state.auth);
  const [isLike, setIsLike] = useState(false);
  const [commentData, setCommentData] = useState(comment);

  const handleLike = () => {
    setIsLike(true);
    setCommentData({
      ...commentData,
      likes: [...commentData.likes, auth._id],
    });
  };

  const handleUnLike = () => {
    setIsLike(false);
    setCommentData({
      ...commentData,
      likes: commentData.likes.filter((like) => like !== auth._id),
    });
  };

  return (
    <View className="flex-row justify-between items-center px-3 py-2  mb-2">
      <View className="flex-1 flex-row items-start">
        <Avatar avatar={commentData.user.avatar} size="middle" />

        <View className="flex-1 ml-2 ">
          <View className="flex-row ">
            <Text className="text-sm leading-4 font-semibold ">
              {commentData.user.username}
            </Text>
            <Text className="text-sm leading-4 text-textColor font-semibold ml-[6px]">
              10 phút trước
            </Text>
          </View>

          <Text className="mt-1">{commentData.content}</Text>
          {commentData.likes.length > 0 && (
            <Text className="mt-1 text-[13px] text-textColor font-medium">
              {commentData.likes.length} lượt thích
            </Text>
          )}
        </View>
      </View>
      <View className="w-6 h-6">
        <LikeBtn
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
          small
        />
      </View>
    </View>
  );
};

export default CardComment;

const styles = StyleSheet.create({});
