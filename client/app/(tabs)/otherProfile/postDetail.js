import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
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
