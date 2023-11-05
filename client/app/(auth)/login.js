import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
      />

      <Button
        title="Đăng nhập"
        onPress={() => {}}
        style={styles.button}
      />

      <Pressable onPress={() => router.replace("/register")}>
        <Text>Go to register</Text>
      </Pressable>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});
