import React from 'react';
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {HomeScreenNavigationProp} from '../navigation/types';

import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';

import {Book} from '../models/Book';

type BookSlotProps = {book: Book};

export const BookSlot = ({book}: BookSlotProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const bookWidth = book.pageCount
    ? Math.round((book.pageCount / width) * 10) / 10
    : 1;
  const bookHeight = book.title.length;
  const calculatedDimensions = {
    width: bookWidth * 70,
    minWidth: 30,
    maxWidth: 250,
    height: bookHeight * 10,
    minHeight: 150,
    maxHeight: 300,
  };
  const titleLargerThanHeight =
    calculatedDimensions.height > calculatedDimensions.maxHeight;
  // const originalSvgWidth = 612;
  // const originalSvgHeight = 792;
  // const aspectRatio = originalSvgWidth / originalSvgHeight;

  const widthStyle = {
    width: titleLargerThanHeight
      ? calculatedDimensions.width + 30
      : calculatedDimensions.width,
    minWidth: calculatedDimensions.minWidth,
    maxWidth: calculatedDimensions.maxWidth,
  };
  const heightStyle = {
    height: calculatedDimensions.height,
    minHeight: calculatedDimensions.minHeight,
    maxHeight: calculatedDimensions.maxHeight,
  };

  // const heightRange = {
  //   max:
  // }

  const bookTitle = {
    // TODO: make book height: a) enough for title to render, b) fall in a random range to vary heights
    width:
      heightStyle.height > heightStyle.minHeight
        ? heightStyle.height
        : heightStyle.minHeight,
    transform: [{rotate: '-90deg'}],
    marginVertical: 0,
  };

  return (
    <Pressable
      style={[styles.book, widthStyle, heightStyle]}
      onPress={() =>
        navigation.navigate('BookScreen', {
          bookInfo: {
            _id: book._id.toString(),
            isInRealm: true,
          },
        })
      }>
      <AppHeaderText customStyle={bookTitle} level={4} numberOfLines={2}>
        {book.title}
      </AppHeaderText>
      {/* I dunno what to do. Can't get the SVG to fill its parent no matter what I try. */}
      {/* Docs for react-native-svg: https://github.com/software-mansion/react-native-svg/blob/main/USAGE.md
      and -transformer: https://github.com/kristerkari/react-native-svg-transformer */}
      {/* <BookImage
        // width="100%"
        // height="100%"
        preserveAspectRatio="none"
      /> */}
    </Pressable>
  );
};

type AuthorProps = {name: string};

const Author = ({name}: AuthorProps) => (
  <View>
    <AppText>{name}</AppText>
  </View>
);

const styles = StyleSheet.create({
  book: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#69F2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
