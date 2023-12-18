import { View, Pressable, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

const PostList = ({ posts, handlePickPost }) => {
  const imgWidth = useMemo(() => Dimensions.get("window").width / 3 - 2, []);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-[3px] flex-row flex-wrap ">
          {posts.map((post) => (
            <Pressable
            key={post._id}
              onLongPress={() => handlePickPost(post)}
              style={{
                position: "relative",
              }} 
            >
              <Image
                source={{ uri: post.images[0].url }}
                style={{
                  width: imgWidth,
                  height: imgWidth,
                  resizeMode: "cover",
                  borderRadius: 1,
                }}
              />
              {post.images.length > 1 && (
                <Ionicons
                  name="md-images"
                  size={16}
                  color="#fff"
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                  }}
                />
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostList;
