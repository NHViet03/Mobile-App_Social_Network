import { View, Pressable, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import { Feather } from "@expo/vector-icons";
import CardHeader from "../../../components/postCard/CardHeader";
import CardBody from "../../../components/postCard/CardBody";
import CardFooter from "../../../components/postCard/CardFooter";
import Loading from "../../../components/Loading";

import { useSelector } from "react-redux";
import { getDataAPI } from "../../../utils/fetchData";

const PostDetail = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const res = await getDataAPI(`post/${id}`, auth.token);
      setPost(res.data.post);
      setLoading(false);
    };

    getPost();
  }, [auth.token, id]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View
        className="mt-4 flex flex-row items-center px-3"
        style={{
          marginTop: StatusBar.currentHeight+12,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text className="ml-5 font-bold text-[20px]">Bài viết</Text>
      </View>
      <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
        {loading ? (
          <Loading />
        ) : (
          Object.keys(post).length > 0 && (
            <View className="mb-2 border-b-[0.5px] border-borderColor">
              <CardHeader post={post} />
              <View style={{ height: 400 }}>
                <CardBody post={post} />
              </View>
              <CardFooter post={post} />
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default PostDetail;
