import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import SelectImage from "../../../components/addPost/SelectImage";
import ShowImage from "../../../components/addPost/ShowImage";
import WriteContent from "../../../components/addPost/WriteContent";

import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../../redux/actions/postAction";

const Index = () => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [post, setPost] = useState({
    content: "",
    images: [],
  });

  const [addPostStep, setAddPostStep] = useState(1);

  const renderComponent = useCallback(() => {
    switch (addPostStep) {
      case 1:
        return (
          <SelectImage
            post={post}
            setPost={setPost}
            setAddPostStep={setAddPostStep}
          />
        );
      case 2:
        return <ShowImage post={post} />;
      case 3:
        return <WriteContent post={post} setPost={setPost} />;
    }
  }, [addPostStep, post, setPost]);

  const handleCreatePost = async () => {
    setLoading(true);
    await dispatch(createPost({ post, auth }));

    setAddPostStep(1);
    setPost({
      content: "",
      images: [],
    });
    setLoading(false);
    router.replace("/home");
  };

  return (
    <View
      className="flex-1"
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View
        className="justify-between items-center flex-row px-3 py-2"
        style={{
          marginTop: StatusBar.currentHeight,
        }}
      >
        {addPostStep > 1 ? (
          <Pressable onPress={() => setAddPostStep(addPostStep - 1)}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.replace("/home")}>
            <AntDesign name="close" size={28} color="black" />
          </Pressable>
        )}
        <Text className="flex-1 text-center font-bold text-xl">
          Bài viết mới
        </Text>
        {addPostStep === 3 ? (
          loading ? (
            <ActivityIndicator size={28} color="#c43302" />
          ) : (
            <Pressable onPress={handleCreatePost}>
              <Text className="text-primary font-medium text-base">
                Chia sẻ
              </Text>
            </Pressable>
          )
        ) : (
          <Pressable onPress={() => setAddPostStep(addPostStep + 1)}>
            <Text className="text-primary font-medium text-base">Tiếp</Text>
          </Pressable>
        )}
      </View>
      <View className="flex-1">{renderComponent()}</View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
