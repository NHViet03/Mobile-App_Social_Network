import { View, Text, ScrollView } from "react-native";
import React from "react";
import CardHeader from "../postCard/CardHeader";
import CardBody from "../postCard/CardBody";
import CardFooter from "../postCard/CardFooter";

const Posts = ({posts}) => {
  
  return (
    <ScrollView
      className="mb-[60px]"
      showsVerticalScrollIndicator={false}
    >
      {posts.length === 0 && (
        <View>
          <Text className="text-center text-lg font-medium">
            Không có bài viết nào.
          </Text>
        </View>
      )}
      {posts.map((post, index) => (
        <View key={index} className="mb-2 border-b-[0.5px] border-borderColor">
          <CardHeader post={post} />
          <View
            style={{
              height: 400,
            }}
          >
            <CardBody post={post} />
          </View>
          <CardFooter post={post} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Posts;
