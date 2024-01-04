import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import CardNotify from "../../../components/home/CardNotify";
import CardSuggest from "../../../components/home/CardSuggest";
import { router } from "expo-router";
import Loading from "../../../components/Loading";

import {
  getNotifies,
  deleteNotifies,
} from "../../../redux/actions/notifyAction";
import { getDataAPI } from "../../../utils/fetchData";

const notify = () => {
  const notify = useSelector((state) => state.notify);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notifies, setNotifies] = useState([]);
  const [suggestUser, setSuggestUser] = useState([]);
  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
    dispatch(getNotifies({ auth }));
  }, [dispatch, auth]);

  useEffect(() => {
    setNotifies(notify.notifies);
  }, [notify.notifies]);

  useEffect(() => {
    const getSuggestUser = async () => {
      setLoadUser(true);
      const res = await getDataAPI("suggestionsUser", auth.token);
      setSuggestUser(res.data.users);
      setLoadUser(false);
    };

    getSuggestUser();
  }, [notifies]);

  const handleRemoveSuggestUser = (id) => {
    setSuggestUser(suggestUser.filter((user) => user._id !== id));
  };

  const handleDeleteAllNotifies = () => {
    dispatch(deleteNotifies({ auth }));
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 16,
        }}
      >
        <View className="flex-row items-center gap-4">
          <Pressable onPress={() => router.push("/home")}>
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text
            className=" text-left font-bold text-xl flex-1"
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Thông báo
          </Text>
        </View>
      </View>
      {/* Phần thông báo */}
      <View className=" px-3 pb-3 border-b-borderColor border-b-[0.5px]">
        <View className="flex flex-row justify-between > *">
          <Text className="text-base font-bold mb-4">30 ngày qua</Text>
          {notifies.length > 0 && (
            <Pressable onPress={handleDeleteAllNotifies}>
              <Text className="text-base font-semibold mb-4 text-primary">
                Xóa tất cả thông báo
              </Text>
            </Pressable>
          )}
        </View>
        <FlatList
          data={notifies}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <View key={index}>
              <CardNotify notify={item} />
            </View>
          )}
        />
      </View>
      {/* Phần gợi ý cho bạn */}
      <View className="mt-4 px-3">
        <Text className="text-base font-bold mb-4">Gợi ý cho bạn</Text>
        {loadUser && <Loading />}
        <FlatList
          data={suggestUser}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              className="mb-3"
              onPress={() =>
                router.push({
                  pathname: `/(tabs)/otherProfile`,
                  params: { id: item._id },
                })
              }
            >
              <CardSuggest
                user={item}
                handleRemoveSuggestUser={handleRemoveSuggestUser}
              />
            </Pressable>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default notify;

const styles = StyleSheet.create({});
