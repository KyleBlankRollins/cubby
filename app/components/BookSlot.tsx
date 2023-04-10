import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {HomeScreenNavigationProp} from '../navigation/types';

import {AppHeaderText} from '../baseComponents/AppHeaderText';

import {Book} from '../models/Book';

type BookSlotProps = {book: Book};

export const BookSlot = ({book}: BookSlotProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const bookWidth = book.displayWidth;
  const bookHeight = book.displayHeight;
  const calculatedDimensions = {
    width: bookWidth,
    minWidth: 30,
    maxWidth: 150,
    height: bookHeight * 7,
    minHeight: 175,
    maxHeight: 300,
  };
  const titleLargerThanHeight =
    calculatedDimensions.height > calculatedDimensions.maxHeight;
  // const originalSvgWidth = 612;
  // const originalSvgHeight = 792;
  // const aspectRatio = originalSvgWidth / originalSvgHeight;

  const widthStyle = {
    width: titleLargerThanHeight ? bookWidth + 40 : bookWidth,
    minWidth: calculatedDimensions.minWidth,
    // maxWidth: calculatedDimensions.maxWidth,
  };
  const heightStyle = {
    height: calculatedDimensions.height,
    minHeight: calculatedDimensions.minHeight,
    maxHeight: calculatedDimensions.maxHeight,
  };

  const bookTitle = {
    // TODO: make book height: a) enough for title to render, b) fall in a random range to vary heights
    width:
      heightStyle.height > heightStyle.minHeight
        ? heightStyle.height
        : heightStyle.minHeight,
    transform: [{rotate: '-90deg'}],
    paddingHorizontal: 10,
  };

  return (
    <View style={[styles.bookContainer, heightStyle]}>
      <Pressable
        style={[styles.book, widthStyle]}
        onPress={() =>
          navigation.navigate('BookScreen', {
            bookInfo: {
              _id: book._id.toString(),
              isInRealm: true,
            },
          })
        }>
        <View style={bookTitle}>
          <AppHeaderText
            customStyle={styles.titleTextStyle}
            level={4}
            numberOfLines={2}>
            {book.title}
          </AppHeaderText>
        </View>

        {/* I dunno what to do. Can't get the SVG to fill its parent no matter what I try. */}
        {/* Docs for react-native-svg: https://github.com/software-mansion/react-native-svg/blob/main/USAGE.md
      and -transformer: https://github.com/kristerkari/react-native-svg-transformer */}
        {/* <BookImage
        // width="100%"
        // height="100%"
        preserveAspectRatio="none"
      /> */}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    justifyContent: 'flex-end',
  },
  titleTextStyle: {
    marginVertical: 0,
  },
  book: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#69F2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
