import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import {ScrollView} from 'react-native-virtualized-view'
import CardHeader from "../../../components/postCard/CardHeader";
import CardBody from "../../../components/postCard/CardBody";
import CardFooter from "../../../components/postCard/CardFooter";

const explore = () => {
  const { id } = useLocalSearchParams();
  const { posts } = useSelector((state) => state.homePosts);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setPost(posts.find((post) => post._id === id));
  }, [id, posts]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
        {post && (
          <View className="mb-2 border-b-[0.5px] border-borderColor">
            <CardHeader post={post} showFollow />
            <View style={{ height: 400 }}>
              <CardBody post={post} />
            </View>
            <CardFooter post={post} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default explore;
