import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import LikeBtn from "../LikeBtn";
import BookmarkBtn from "./BookmarkBtn";
import { PostContext } from "../../app/(tabs)/home";

const CardFooter = ({ post }) => {
  const { handleOpenCommentModal, handleOpenSharePostModal } =
    useContext(PostContext);

  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [postData, setPostData] = useState(post);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLike = () => {
    setIsLike(true);
    setPostData({
      ...postData,
      likes: [...postData.likes, auth._id],
    });
  };

  const handleUnLike = () => {
    setIsLike(false);
    setPostData({
      ...postData,
      likes: postData.likes.filter((like) => like !== auth._id),
    });
  };

  const handleBookmark = () => {
    setIsBookmark(true);
  };
  const handleUnBookmark = () => {
    setIsBookmark(false);
  };

  const handlePressComment = () => {
    dispatch({
      type: GLOBAL_TYPES.COMMENT_MODAL,
      payload: postData,
    }),
      handleOpenCommentModal();
  };

  const handlePressShare = () => {
    dispatch({
      type: GLOBAL_TYPES.SHARE_POST_MODAL,
      payload: postData,
    }),
      handleOpenSharePostModal();
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
          <Pressable onPress={handlePressComment}>
            <FontAwesome name="comment-o" size={25} color="black" />
          </Pressable>
          <Pressable onPress={handlePressShare}>
            <Ionicons name="ios-paper-plane-outline" size={25} color="black" />
          </Pressable>
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
          {postData.likes.length} lượt thích
        </Text>
      </View>
      <View>
        <Text>
          <Text className="font-semibold ">{postData.user.username}</Text>{" "}
          {postData.content.length < 80 || readMore
            ? postData.content
            : postData.content.slice(0, 80) + "..."}
        </Text>
        {postData.content.length > 80 && (
          <Pressable onPress={() => setReadMore(!readMore)}>
            <Text className="text-textColor mt-1">
              {readMore ? "Ẩn bớt" : "Xem thêm"}
            </Text>
          </Pressable>
        )}
      </View>
      <Pressable onPress={handlePressComment}>
        <Text className="text-textColor mt-2">
          {postData.comments.length > 0
            ? `Xem tất cả ${postData.comments.length} bình luận`
            : "Thêm bình luận..."}
        </Text>
      </Pressable>
    </View>
  );
};

export default CardFooter;

const styles = StyleSheet.create({});
