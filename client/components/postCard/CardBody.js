import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";

const CardBody = ({ post }) => {
  const [indicator, setIndicator] = useState(1);
  const imgWidth = parseInt(Dimensions.get("window").width);
  return (
    <View className="flex-1">
      <FlatList
        data={post.images}
        horizontal={true}
        numColumns={1}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const x = event.nativeEvent.contentOffset.x;
          setIndicator(Math.round(x / imgWidth) + 1);
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: imgWidth,
              height: 400,
            }}
          >
            <Image
              key={index}
              source={{
                uri: item.url,
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </View>
        )}
      />
      {post.images.length > 1 && (
        <Text className="absolute top-3 right-3 py-1 px-[10px] text-white font-medium text-sm bg-dark-dark_80 rounded-full ">
          {indicator}/{post.images.length}
        </Text>
      )}
    </View>
  );
};

export default CardBody;

const styles = StyleSheet.create({});
