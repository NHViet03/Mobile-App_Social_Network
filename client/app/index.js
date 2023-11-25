import React, { useEffect } from "react";
import { View } from "react-native";
import { Redirect } from "expo-router";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "../redux/actions/authAction";

// Config moment
moment.updateLocale("vi", {
  relativeTime: {
    future: "trong %s",
    past: "%s trước",
    s: "1 giây",
    ss: "%d giây",
    m: "1 phút",
    mm: "%d phút",
    h: "1 giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    w: "1 tuần",
    ww: "%d tuần",
    M: "1 tháng",
    MM: "%d tháng",
    y: "1 năm",
    yy: "%d năm",
  },
});

const index = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <View>
      {auth.token ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/(auth)/login" />
      )}
    </View>
  );
};

export default index;
