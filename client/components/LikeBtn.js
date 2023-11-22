import { Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const LikeBtn = ({ isLike, handleLike, handleUnLike, small }) => {
  return (
    <>
      {isLike ? (
        <Pressable onPress={handleUnLike}>
          <AntDesign name="heart" size={small ? 18 : 23} color="#c43302" />
        </Pressable>
      ) : (
        <Pressable onPress={handleLike}>
          <AntDesign name="hearto" size={small ? 18 : 23} color="black" />
        </Pressable>
      )}
    </>
  );
};

export default LikeBtn;
