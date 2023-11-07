import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import LikeBtn from "../LikeBtn";
import BookmarkBtn from "./BookmarkBtn";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const handleLike = () => {
    setIsLike(true);
    
  };

  const handleUnLike = () => {
    setIsLike(false);
  };

  const handleBookmark = () => {
    setIsBookmark(true);
  };
  const handleUnBookmark = () => {
    setIsBookmark(false);
  };

  return (
    <View className=" px-3 pt-2 pb-3">
      <View className="flex-row justify-between items-center mb-[10px]">
        <View className="flex-row items-center justify-center gap-5">
          <View>
            <LikeBtn
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
            />
          </View>
          <FontAwesome name="comment-o" size={25} color="black" />
          <Ionicons name="ios-paper-plane-outline" size={25} color="black" />
        </View>
        <View>
          <BookmarkBtn
            isBookmark={isBookmark}
            handleBookmark={handleBookmark}
            handleUnBookmark={handleUnBookmark}
          />
        </View>
      </View>
      <View>
        <Text className="font-semibold text-[15px]">
          {post.likes.length} lượt thích
        </Text>
      </View>
      <View>
        <Text>
          <Text className="font-semibold ">{post.user.username}</Text>{" "}
          {post.content.length < 80 || readMore
            ? post.content
            : post.content.slice(0, 80) + "..."}
        </Text>
        {post.content.length > 80 && (
          <Pressable onPress={() => setReadMore(!readMore)}>
            <Text className="text-textColor mt-1">
              {readMore ? "Ẩn bớt" : "Xem thêm"}
            </Text>
          </Pressable>
        )}
      </View>
      <Pressable>
        <Text className="text-textColor mt-2">
        {post.comments.length > 0
          ? `Xem tất cả ${post.comments.length} bình luận`
          : "Thêm bình luận..."}
        </Text>
      </Pressable>
    </View>
  );
};

export default CardFooter;

const styles = StyleSheet.create({});
