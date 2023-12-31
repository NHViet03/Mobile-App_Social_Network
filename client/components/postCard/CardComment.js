import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import LikeBtn from "../LikeBtn";
import moment from "moment";
import { TextInput } from "react-native-gesture-handler";
import { likeComment, unlikeComment, updateComment } from "../../redux/actions/commentAction";

const CardComment = ({ comment , onEdit, setOnEdit, postData, index , indexActive}) => {
  const auth = useSelector((state) => state.auth);
  const [isLike, setIsLike] = useState(false);
  const [commentData, setCommentData] = useState({});
  
  useEffect(() => {
    setCommentData(comment);
  }, [comment]);
  useEffect(() => {
   
    if (commentData?.likes?.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [ commentData?.likes, auth.user._id]);
 
  const dispatch = useDispatch()
  const handleLike = () => {
   
    setCommentData({
      ...commentData,
      likes: [...commentData?.likes, auth.user._id],
    });
  
    dispatch(likeComment({commentData,postData , auth}));
    setIsLike(true);
  };

  const handleUnLike = () => {
  
    setCommentData({
      ...commentData,
      likes: commentData?.likes.filter((like) => like !== auth.user._id),
    });
    dispatch(unlikeComment({commentData ,postData , auth}));
    setIsLike(false);
  };

  const handleUpdate = () => {
    dispatch(updateComment({commentData, postData , auth}))
    setOnEdit(false)
  }
 
  return (
    <View>
      {(onEdit && comment.user._id === auth.user._id && index ===  indexActive)
      ? (
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
                style={{borderWidth: 1, borderColor: '#000', borderRadius: 5, padding: 5}}
                className="flex-1 ml-3 mr-1 "
                multiline
                numberOfLines={4} // You can adjust this based on your requirements
                value={commentData?.content}
                onChangeText={(text) => setCommentData({ ...commentData, content: text })}
              />
            </View>
          </View>
          <View className="w-7 h-7">
          <Pressable onPress={handleUpdate} >
            <Text
              className={` text-primary font-semibold text-base`}
            >
              Sửa
            </Text>
          </Pressable>
          </View>
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
