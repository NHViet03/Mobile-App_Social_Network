import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Avatar = ({ avatar, size, border, primary }) => {
  const customStyle = {
    avatarContainer: styles.avatarContainer,
    avatar: styles.avatar,
    size: size ? styles[size] : styles.small,
    primary: primary ? styles.primary : "",
  };
  return (
    <>
      {border ? (
        <LinearGradient
          colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf",]}
          style={[customStyle.avatarContainer, customStyle.size]}
        >
          <View
            style={[
              customStyle.avatarContainer,
              {
                backgroundColor: "#fff",
                width: customStyle.size.width - 4,
                height: customStyle.size.height - 4,
                borderRadius: customStyle.size.borderRadius,
              },
            ]}
          >
            <Image
              source={{
                uri: avatar,
              }}
              style={[
                customStyle.avatar,
                customStyle.primary,
                {
                  width:
                    size === "large"
                      ? customStyle.size.width - 12
                      : customStyle.size.width - 8,
                  height:
                    size === "large"
                      ? customStyle.size.height - 12
                      : customStyle.size.height - 8,
                  borderRadius: size === "large"
                  ? customStyle.size.borderRadius - 6
                  : customStyle.size.borderRadius - 4,
                },
              ]}
            />
          </View>
        </LinearGradient>
      ) : (
        <Image
          source={{
            uri: avatar,
          }}
          style={[customStyle.avatar, customStyle.primary, customStyle.size]}
        />
      )}
    </>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    objectFit: "contain",
    borderColor: "#d9d9d9",
    borderWidth: 0.5,
    padding: 1,
  },
  small: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  middle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  medium: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  large: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  primary: {
    borderColor: "#c43302",
    borderWidth: 2,
  },
});
