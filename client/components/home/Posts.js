import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import CardHeader from "../postCard/CardHeader";
import CardBody from "../postCard/CardBody";
import CardFooter from "../postCard/CardFooter";

const Posts = () => {
  const  homePosts  = useSelector((state) =>state.homePosts);

  return (
    <FlatList
      data={homePosts.posts}
      numColumns={1}
      className="mb-[60px]"
      scrollEnabled={true}
      renderItem={({ item, index }) => (
        <View key={index} className="mb-2 border-b-[0.5px] border-borderColor">
          <CardHeader post={item}/>
          <CardBody post={item} />
          <CardFooter post={item} />
        </View>
      )}
    />
  );
};

export default Posts;

const styles = StyleSheet.create({});
