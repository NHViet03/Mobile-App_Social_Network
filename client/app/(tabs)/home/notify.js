import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardNotify from "../../../components/home/CardNotify";
import CardSuggest from "../../../components/home/CardSuggest";
import { router } from "expo-router";

const notify = () => {
  const { notifies } = useSelector((state) => state.notify);
  const { users } = useSelector((state) => state.homePosts);

  const[suggestUser, setSuggestUser ] = useState(users);
  
  const handleRemoveSuggestUser = (id) => {
    setSuggestUser(suggestUser.filter(user => user._id !== id))
  }

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <View className="mt-5 px-3 pb-3 border-b-borderColor border-b-[0.5px]">
        <Text className="text-base font-bold mb-4">30 ngày qua</Text>
        <FlatList
          data={notifies}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              className="mb-3"
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/userProfile",
                  params: { id: item.user._id },
                })
              }
            >
              <CardNotify notify={item} />
            </Pressable>
          )}
        />
      </View>
      <View className="mt-4 px-3">
        <Text className="text-base font-bold mb-4">Gợi ý cho bạn</Text>
        {suggestUser && (
          <FlatList
            data={suggestUser}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <Pressable
                key={index}
                className="mb-3"
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/userProfile",
                    params: { id: item._id },
                  })
                }
              >
                <CardSuggest user={item} handleRemoveSuggestUser={handleRemoveSuggestUser} />
              </Pressable>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default notify;

const styles = StyleSheet.create({});
