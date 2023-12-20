import { View, Text, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import CardHeader from "../postCard/CardHeader";
import CardBody from "../postCard/CardBody";
import CardFooter from "../postCard/CardFooter";
import Loading from "../Loading";

import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/postAction";

const Posts = () => {
  const auth=useSelector(state=>state.auth);
  const homePosts=useSelector(state=>state.homePosts)
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPostsData = async () => {
      if (homePosts.firstLoad) return;
      setLoading(true);
      await dispatch(getPosts(auth.token));
      setLoading(false);
    };

    getPostsData();
  }, [auth.token, homePosts.firstLoad, dispatch]);

  useEffect(() => {
    setPosts(homePosts.posts);
  }, [homePosts.posts]);

  return (
    <ScrollView className="mb-[60px]" showsVerticalScrollIndicator={false}>
      {posts.length === 0 && (
        <View>
          <Text className="text-center text-lg font-medium">
            Không có bài viết nào.
          </Text>
        </View>
      )}
      {loading && <Loading />}
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
