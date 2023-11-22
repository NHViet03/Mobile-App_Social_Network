import React from 'react';
import { Text, View, Image } from 'react-native';

const YouMessage = ({ text, image }) => {
  return (
    <View
      style={{
        display: 'flex',
        alignSelf: 'flex-end',
        minHeight: 0,
        minWidth: 0,
        borderRadius: 20,
        marginBottom: 10,
      }}
    >
      {text && (
        <Text
          style={{
            color: '#fff',
            alignItems: 'flex-end',
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: '#dc8567',
            borderRadius: 10,
          }}
        >
          {text}
        </Text>
      )}
      {image && (
        <View
          style={{
            color: '#fff',
            alignItems: 'flex-end',
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor: '#dc8567',
          }}
        >
          <Image source={{ uri: image }} style={{ minWidth: 100, minHeight: 100 }} />
        </View>
      )}
    </View>
  );
};

export default YouMessage;
