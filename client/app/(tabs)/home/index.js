import { View, StatusBar, Image, Pressable } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import Posts from "../../../components/home/Posts";
import StoryList from "../../../components/home/StoryList";
import Loading from "../../../components/Loading";

import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../../redux/actions/postAction";
import { getNotifies } from "../../../redux/actions/notifyAction";
import NotifyAlert from "../../../components/NotifyAlert";

const index = () => {
  const auth = useSelector((state) => state.auth);
  const homePosts = useSelector((state) => state.homePosts);
  const { notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (auth.token) {
      dispatch(getNotifies({ auth }));
    }
  },[auth.token, dispatch]);
  useEffect(() => {
    if (!auth.token) router.replace("/(auth)/login");
  }, [auth.token]);

  useEffect(() => {
    const getPostsData = async () => {
      if (homePosts.firstLoad && !reload) return;
      if (loading) return;
      setLoading(true);
      setPosts([]);
      await dispatch(getPosts(auth.token));
      setLoading(false);
      setReload(false);
    };

    getPostsData();
  }, [auth.token, homePosts.firstLoad, reload, loading, dispatch]);

  useEffect(() => {
    setPosts(homePosts.posts);
  }, [homePosts.posts]);



  return (
    <ScrollView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
      }}
      showsVerticalScrollIndicator={false}
      onScroll={(e) => e.nativeEvent.contentOffset.y <= 0 && setReload(true)}
    >
      <View className="justify-between items-center flex-row pl-1 pr-3">
        <Image
          style={{
            width: 160,
            height: 80,
            objectFit: "contain",
          }}
          source={require("../../../assets/logo-2.png")}
        />
        <View className="flex-row items-center ">
          <Pressable
            className="w-8 mr-4"
            onPress={() => router.push("/home/notify")}
          >
          {
            notify.notifies.length > 0
            ? <NotifyAlert />
            :  <AntDesign name="hearto" size={24} color="black" />
          }
          </Pressable>
          <Pressable className="w-8" onPress={() => router.push("/message")}>
            <Feather name="message-square" size={25} color="black" />
          </Pressable>
        </View>
      </View>
      <StoryList />
      {loading && <Loading />}
      <Posts posts={posts} />
    </ScrollView>
  );
};

export default index;
