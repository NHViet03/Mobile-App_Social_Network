import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useMemo } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ImageGallery = ({ posts, handlePickPost }) => {
  const imgWidth = useMemo(() => Dimensions.get("window").width / 3 - 2, []);

  const clusterPosts = useMemo(() => {
    const res = [];
    const group = 5;
    for (let i = 0; i < posts.length; i += group) {
      res.push(posts.slice(i, i + group));
    }
    return res;
  }, [posts]);

  const handlePressPost = (post) => {
    if (post) {
      router.push({
        pathname: "/(tabs)/search/explore",
        params: { id: post._id },
      });
    }
  };

  return (
    <View>
      {clusterPosts &&
        clusterPosts.map((cluster, index) => {
          return (
            <View key={index} className="flex-row justify-between mb-[2px]">
              {index % 2 == 1 && cluster[4] && (
                <Pressable
                  onLongPress={() => handlePickPost(cluster[4])}
                  onPress={() => handlePressPost(cluster[4])}
                  style={{
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: cluster[4].images[0].url }}
                    style={{
                      width: imgWidth + 1,
                      height: imgWidth * 2 + 2,
                      resizeMode: "cover",
                      borderRadius: 1,
                      marginRight: 3,
                    }}
                  />
                  {cluster[4].images.length > 1 && (
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
              )}
              <View
                className="flex-row flex-wrap justify-between gap-[2px]"
                style={{
                  width: imgWidth * 2 + 5,
                }}
              >
                {cluster.slice(0, 4).map((post, index) => (
                  <Pressable
                    key={index}
                    onLongPress={() => handlePickPost(post)}
                    onPress={() => handlePressPost(post)}
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

              {index % 2 == 0 && cluster[4] && (
                <Pressable
                  onLongPress={() => handlePickPost(cluster[4])}
                  onPress={() => handlePressPost(cluster[4])}
                  style={{
                    position: "relative",
                  }}
                >
                  <Image
                    source={{ uri: cluster[4].images[0].url }}
                    style={{
                      width: imgWidth + 1,
                      height: imgWidth * 2 + 2,
                      resizeMode: "cover",
                      borderRadius: 1,
                      marginLeft: 3,
                    }}
                  />
                  {cluster[4].images.length > 1 && (
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
              )}
            </View>
          );
        })}
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({});
