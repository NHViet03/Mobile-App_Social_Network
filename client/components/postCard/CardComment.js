import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import LikeBtn from "../LikeBtn";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import {
  likeComment,
  unlikeComment,
  updateComment,
} from "../../redux/actions/commentAction";

const CardComment = ({
  comment,
  onEdit,
  setOnEdit,
  postData,
  index,
  indexActive,
  handleCloseAction,
}) => {
  const auth = useSelector((state) => state.auth);
  const [isLike, setIsLike] = useState(false);
  const [commentData, setCommentData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCommentData(comment);
  }, [comment]);
  useEffect(() => {
    if (commentData?.likes?.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [commentData]);
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(
      likeComment({
        commentData: {
          ...commentData,
          likes: [...commentData?.likes, auth.user],
        },
        postData,
        auth,
      })
    );
  };

  const handleUnLike = () => {
    dispatch(
      unlikeComment({
        commentData: {
          ...commentData,
          likes: commentData?.likes.filter(
            (like) => like._id !== auth.user._id
          ),
        },
        postData,
        auth,
      })
    );
  };

  const handleUpdate = () => {
    dispatch(updateComment({ commentData, postData, auth }));
    setOnEdit(false);
    handleCloseAction();
  };

  return (
    <View>
      {onEdit && comment.user._id === auth.user._id && index === indexActive ? (
        <View className="flex-row justify-between items-center px-3 py-2  mb-2">
          <View className="flex-1 flex-row items-start mr-1">
            <Avatar avatar={commentData?.user?.avatar} size="middle" />

            <View className="flex-1 ml-2">
              <View className="flex-row ">
                <Text className="text-sm leading-4 font-semibold ">
                  {commentData?.user.username}
                </Text>
                <Text className="text-sm leading-4 text-textColor font-semibold ml-[6px]">
                  {comment.createdAt
                    ? moment(comment.createdAt).fromNow()
                    : "10 phút trước"}
                </Text>
              </View>

              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 5,
                  padding: 5,
                }}
                className="flex-1 ml-3 mr-1 "
                multiline
                numberOfLines={4} // You can adjust this based on your requirements
                value={commentData?.content}
                onChangeText={(text) =>
                  setCommentData({ ...commentData, content: text })
                }
              />
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size={28} color="#c43302" />
          ) : (
            <Pressable
              onPress={handleUpdate}
              className="w-8 h-7 ml-3 mr-[-6px]"
            >
              <Text className={` text-primary font-semibold text-base`}>
                Sửa
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View className="flex-row justify-between items-center px-3 py-2  mb-2">
          <View className="flex-1 flex-row items-start mr-1">
            <Avatar avatar={commentData?.user?.avatar} size="middle" />

            <View className="flex-1 ml-2">
              <View className="flex-row ">
                <Text className="text-sm leading-4 font-semibold ">
                  {commentData?.user?.username}
                </Text>
                <Text className="text-sm leading-4 text-textColor font-semibold ml-[6px]">
                  {comment.createdAt
                    ? moment(comment.createdAt).fromNow()
                    : "10 phút trước"}
                </Text>
              </View>

              <Text className="mt-1">{commentData?.content}</Text>
              {commentData?.likes?.length > 0 && (
                <Text className="mt-1 text-[13px] text-textColor font-medium">
                  {commentData?.likes?.length} lượt thích
                </Text>
              )}
            </View>
          </View>
          <View className="w-7 h-7">
            <LikeBtn
              isLike={isLike}
              handleLike={handleLike}
              handleUnLike={handleUnLike}
              small
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CardComment;

const styles = StyleSheet.create({});
