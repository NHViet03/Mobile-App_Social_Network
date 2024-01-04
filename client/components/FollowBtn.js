import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { follow, unFollow } from "../redux/actions/userAction";

const FollowBtn = ({ user, showFull }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(auth.user.following.find((item) => item._id === user._id) ? true :false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [auth.user.following,user._id]);

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);
    setFollowed(true);
    await dispatch(follow({ user, auth }));
    setLoading(false);
  };

  const handleUnFollow = async () => {
    if (loading) return;
    setLoading(true);
    setFollowed(false);
    await dispatch(unFollow({ user, auth }));
    setLoading(false);
  };

  if (auth.user._id === user._id) return <View />;

  return (
    <View className={`${showFull ? "flex-1" : ""}`}>
      {followed ? (
        <Pressable
          className="bg-inputColor rounded-[6px] px-4 py-2"
          onPress={handleUnFollow}
        >
          <Text className="font-bold text-center">
            {showFull ? "Đang theo dõi" : "Đang theo..."}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          className="bg-primary rounded-[6px] px-4 py-2"
          onPress={handleFollow}
        >
          <Text className="font-bold text-white text-center">Theo dõi</Text>
        </Pressable>
      )}
    </View>
  );
};

export default FollowBtn;
