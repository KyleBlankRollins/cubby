import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {HomeScreenNavigationProp} from '../navigation/types';
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
  const book = bookInfo.volumeInfo;

  return (
    <Pressable
      style={styles.bookContainer}
      onPress={() => {
        navigation.navigate('BookScreen', {
          book: book,
        });
      }}>
      <View>
        {book.imageLinks && (
          <Image
            style={styles.image}
            source={{
              uri: book.imageLinks!.thumbnail,
            }}
          />
        )}
      </View>
      <View>
        <AppHeaderText level={3}>{book.title}</AppHeaderText>

        <FlatList
          data={book.authors}
          renderItem={({item}) => <Item name={item} />}
          keyExtractor={author => author}
        />

        <AppText>{book.publisher}</AppText>
        <AppText>{book.publishDate}</AppText>
        <AppText>{book.description}</AppText>
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
  bookContainer: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: 125,
    marginRight: 10,
  },
});
