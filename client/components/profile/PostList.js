import { View, Pressable, Image, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const PostList = ({ posts, handlePickPost, profile }) => {
  const imgWidth = useMemo(() => Dimensions.get("window").width / 3 - 2, []);

  return (
    <View className="gap-[3px] flex-row flex-wrap ">
      {posts.map((post) => (
        <Pressable
          key={post._id}
          onLongPress={() => handlePickPost(post)}
          onPress={() =>
            profile
              ? router.push({
                  pathname: "/profile/postDetail",
                  params: { id: post._id },
                })
              : router.push({
                  pathname: "/otherProfile/postDetail",
                  params: { id: post._id },
                })
          }
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
  );
};

export default PostList;
