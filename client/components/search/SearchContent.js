import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";
import CardSearch from "./CardSearch";

const SearchContent = ({ users }) => {
  return (
    <View className="my-3 mx-4">
      <Text className="text-base font-bold mb-4">Gần đây</Text>
      {users &&
        users.map((user, index) => (
          <Pressable
            key={index}
            className="mb-3"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/userProfile",
                params: { id: user._id },
              })
            }
          >
            <CardSearch user={user} />
          </Pressable>
        ))}
    </View>
  );
};

export default SearchContent;

const styles = StyleSheet.create({});
