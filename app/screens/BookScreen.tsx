import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {BookScreenNavigationProp} from '../navigation/types';
import {HomeScreenNavigationProp} from '../navigation/types';
import {BookScreenRouteProp} from '../navigation/types';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {AddBookForm} from '../components/AddBookForm';

import {Book} from '../models/Book';
import {BookMap} from '../models/gBookApiRaw';
import {Cubby} from '../models/Cubby';
import {RealmContext} from '../models';

const {useRealm} = RealmContext;

export const BookScreen: React.FC<BookScreenNavigationProp> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [bookFormVisible, setBookFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);
  const [book, setBook] = useState<Book | BookMap>();

  const route = useRoute<BookScreenRouteProp>();
  const {bookInfo} = route.params;

  const realm = useRealm();

  useEffect(() => {
    if (bookInfo.isInRealm) {
      // If the book already exists in the realm, find the realm object, then set it as the book.
      const realmBook = realm.objectForPrimaryKey(Book, bookInfo._id);
      setBook(realmBook);
    } else {
      // If not in the realm, set the book to the raw data.
      setBook(bookInfo.rawBook);

      return;
    }
  }, [realm, bookInfo, setBook]);

  // TODO: Check if book is already in the realm, which means it's in a cubby. Show that info.

  const handleModalClose = () => {
    setBookFormVisible(false);
    setOpacityLevel(1);
  };

  const handleModalOpacity = () => {
    return {
      opacity: opacityLevel,
    };
  };

  const handleAddBook = useCallback(
    (destinationCubbyId: Realm.BSON.ObjectId): void => {
      // TODO: Add alert about needing a destination cubby.
      if (!destinationCubbyId) {
        return;
      }

      const destinationCubby: Cubby | null = realm.objectForPrimaryKey(
        'Cubby',
        destinationCubbyId,
      );

      realm.write(() => {
        // Create new book
        // @ts-ignore. TypeScript isn't happy about BookMap not having all of a Realm Object's properties.
        const newBook: Book = realm.create('Book', {
          _id: bookInfo._id,
          ...bookInfo.rawBook,
        });

        // Assuming all cubbies have exactly 1 section.
        destinationCubby?.sections[0].books.push(newBook);

        handleModalClose();

        setBook(newBook);

        bookInfo.isInRealm = true;

        // TODO: handle successful addition. Inform user book has been added - maybe prompt to go to cubby.
      });
    },
    [realm, bookInfo],
  );

  if (!book) {
    return (
      <View>
        <AppText>Not ready to render.</AppText>
      </View>
    );
  } else {
    return (
      <ScrollView style={[styles.container, handleModalOpacity()]}>
        <AppHeaderText level={2}>{book.title}</AppHeaderText>
        <AppHeaderText level={4}>by {book.authors}</AppHeaderText>
        <AppText>{book.categories}</AppText>

        {/* TODO: Figure out how to programmatically chunk descriptions into paragraphs. */}
        <AppText>{book.description}</AppText>

        {/* TODO: Add placeholder for books with no cover */}
        {book.imageLinks && (
          <Image
            style={styles.image}
            source={{
              uri: book.imageLinks!.thumbnail,
            }}
          />
        )}

        {bookInfo.isInRealm && (
          <AppButton
            title="Remove book"
            onPress={() => {
              //TODO: add confirmation
              realm.write(() => {
                realm.delete(book);
              });

              setBook(undefined);

              bookInfo.isInRealm = false;

              // @ts-ignore
              navigation.navigate('CubbyManager');
            }}
          />
        )}

        {!bookInfo.isInRealm && (
          <AppButton
            onPress={() => {
              setBookFormVisible(true);
              setOpacityLevel(0.25);
            }}
            title="Add to Cubby"
            options={{
              customStyle: styles.customButtonStyle,
              fullWidth: false,
              largeText: true,
            }}
          />
        )}

        <AddBookForm
          bookInfo={book}
          onSubmit={handleAddBook}
          onClose={handleModalClose}
          visible={bookFormVisible}
        />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: 125,
    marginRight: 10,
  },
  customButtonStyle: {
    marginVertical: 30,
    width: 300,
  },
});
