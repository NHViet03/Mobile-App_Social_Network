import { Pressable } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const BookmarkBtn = ({isBookmark,handleBookmark,handleUnBookmark}) => {
  return (
    <>
        {isBookmark ? (
            <Pressable onPress={handleUnBookmark}>
                <FontAwesome name="bookmark" size={24} color="#c43302" />
            </Pressable>
        ):(
            <Pressable onPress={handleBookmark}>
                <FontAwesome name="bookmark-o" size={25} color="black" />
            </Pressable>
        )}
    </>
  )
}

export default BookmarkBtn

