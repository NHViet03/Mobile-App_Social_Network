import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";

const ShowImage = ({ post }) => {
  const imgWidth = Dimensions.get("window").width;

  return (
    
      <ScrollView showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled={true}
        style={{
            flex:1
        }}
        
      >
        {post.images.map((image, index) => (
          <View key={index}
          style={{
            width:imgWidth-24,
            height:'100%',
            alignItems:'center',
            justifyContent:'center',
            marginHorizontal:12
          }}
          >
            <Image
              source={{
                uri: image,
              }}
              style={{
                width: imgWidth-24,
                height: parseFloat((imgWidth-24)*1.5),
                borderRadius:12
              }}
            />
          </View>
        ))}
      </ScrollView>
    
  );
};

export default ShowImage;

const styles = StyleSheet.create({});
