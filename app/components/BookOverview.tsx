import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {HomeScreenNavigationProp} from '../navigation/types';
import {light, dark, lightStyles, darkStyles} from '../styles/theme';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {bookAPIRaw} from '../models/bookAPIRaw';

type BookOverviewProps = {
  // TODO: Update this when I have more info.
  bookInfo: any;
};

export const BookOverview: React.FC<BookOverviewProps> = ({bookInfo}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {width} = useWindowDimensions();
  const isDarkMode = useColorScheme() === 'dark';

  const book = bookInfo.volumeInfo;

  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const themeColors = isDarkMode ? dark : light;

  const tileDimensions = {
    width: width / 2 - 24,
    minHeight: 200,
    marginHorizontal: 5,
    marginVertical: 10,
  };

  const border = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: themeColors.surface4,
  };

  return (
    <Pressable
      style={[styles.book, themeStyles.surface2, border, tileDimensions]}
      onPress={() => {
        navigation.navigate('BookScreen', {
          book: book,
        });
      }}>
      {book.imageLinks && (
        <Image
          style={styles.image}
          source={{
            uri: book.imageLinks!.thumbnail,
          }}
        />
      )}

      <View>
        <AppHeaderText level={4}>{book.title}</AppHeaderText>

        {/* <FlatList
          data={book.authors}
          renderItem={({item}) => <Item name={item} />}
          keyExtractor={author => author}
        /> */}

        {/* <AppText>{book.publisher}</AppText>
        <AppText>{book.publishDate}</AppText>
        <AppText>{book.description}</AppText> */}
        <AppText>Is in realm: {book.isInRealm ? 'Yes' : 'No'}</AppText>
      </View>
    </Pressable>
  );
};

type ItemProps = {name: string};

const Item = ({name}: ItemProps) => (
  <View>
    <AppText>{name}</AppText>
  </View>
);

const styles = StyleSheet.create({
  book: {
    justifyContent: 'center',
    alignItems: 'center',
    // width: '50%',
    // marginHorizontal: 5,
    // marginVertical: 10,
    paddingVertical: 15,
  },
  image: {
    ...StyleSheet.absoluteFill,
    resizeMode: 'cover',
    opacity: 0.15,
    // height: 250,
    // width: 150,
  },
  bookContent: {
    opacity: 1.0,
  },
});
