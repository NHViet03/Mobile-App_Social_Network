import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import LikeBtn from "../LikeBtn";
import BookmarkBtn from "./BookmarkBtn";
import { PostContext } from "../../app/_layout";

import { useSelector, useDispatch } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import {
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from "../../redux/actions/postAction";

const CardFooter = ({ post }) => {
  const { handleOpenCommentModal, handleOpenSharePostModal } =
    useContext(PostContext);

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((like) => like === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setIsBookmark(true);
    } else {
      setIsBookmark(false);
    }
  }, [auth.user.saved, post._id]);
  const handleLike = () => {
    post.likes = [auth.user._id, ...post.likes];
    if (loadLike) return;
    setLoadLike(true);
    setIsLike(true);
    dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    post.likes = post.likes.filter((id) => id !== auth.user._id);
    await dispatch(unlikePost({ post, auth }));
    setIsLike(false);
  };

  const handleBookmark = () => {
    dispatch(savePost({ post, auth }));
    setIsBookmark(true);
  };
  const handleUnBookmark = () => {
    dispatch(unsavePost({ post, auth }));
    setIsBookmark(false);
  };

  const handlePressComment = () => {
    dispatch({
      type: GLOBAL_TYPES.COMMENT_MODAL,
      payload: post,
    }),
      handleOpenCommentModal();
  };

  const handlePressShare = () => {
    dispatch({
      type: GLOBAL_TYPES.SHARE_POST_MODAL,
      payload: post,
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
        <Text className="text-textColor text-xs mt-[2px]">
          {moment(post.createdAt).fromNow()}
        </Text>
      </View>
      <Pressable onPress={handlePressComment}>
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
