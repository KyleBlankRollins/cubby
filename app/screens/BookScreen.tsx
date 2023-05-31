import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {BookScreenNavigationProp} from '../navigation/types';
import {HomeScreenNavigationProp} from '../navigation/types';
import {BookScreenRouteProp} from '../navigation/types';
import {light, dark, lightStyles, darkStyles} from '../styles/theme';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {AddBookForm} from '../components/AddBookForm';
import {HorizontalRule} from '../baseComponents/HorizontalRule';

import {Book} from '../models/Book';
import {BookMap} from '../models/gBookApiRaw';
import {Cubby} from '../models/Cubby';
import {Shelf} from '../models/Shelf';
import {RealmContext} from '../models';

const {useRealm} = RealmContext;

export const BookScreen: React.FC<BookScreenNavigationProp> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<BookScreenRouteProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();

  const [bookFormVisible, setBookFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);
  const [cubby, setCubby] = useState<Cubby | null>(null);
  const [book, setBook] = useState<Book | BookMap>();

  const {bookInfo} = route.params;

  const realm = useRealm();

  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const themeColors = isDarkMode ? dark : light;

  useEffect(() => {
    if (bookInfo.isInRealm) {
      // If the book already exists in the realm, find the realm object, then set it as the book.
      const realmBook = realm.objectForPrimaryKey(Book, bookInfo._id);
      setBook(realmBook);

      // Get the book's linking shelf objects.
      const bookShelf: Realm.Results<Shelf> = realmBook!.linkingObjects(
        'Shelf',
        'books',
      );

      // Get the shelf's linking cubby objects.
      const results: Realm.Results<Cubby> = bookShelf[0].linkingObjects(
        'Cubby',
        'shelves',
      );

      // Finally, get the book's parent cubby object.
      const bookCubby = results[0];
      setCubby(bookCubby);
    } else {
      // If not in the realm, set the book to the raw data.
      setBook(bookInfo.rawBook);

      return;
    }
  }, [realm, bookInfo, setBook]);

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
    (destinationCubbyId: Realm.BSON.ObjectId | undefined): void => {
      // TODO: Add alert about needing a destination cubby.
      if (!destinationCubbyId) {
        return;
      }

      // Cubby where the book should go.
      const destinationCubby: Cubby | null = realm.objectForPrimaryKey(
        'Cubby',
        destinationCubbyId,
      );

      // The last shelf in the cubby.
      const destinationShelf = destinationCubby!.shelves.sorted(
        'order',
        true,
      )[0];

      realm.write(() => {
        // Create new book
        // @ts-ignore. TypeScript isn't happy about BookMap not having all of a Realm Object's properties.
        const newBook: Book = realm.create(Book, {
          _id: bookInfo._id,
          displayWidth: bookInfo.rawBook?.pageCount
            ? calculateBookThickness(bookInfo.rawBook.pageCount!, width)
            : 20,
          displayHeight: bookInfo.rawBook!.title.length,
          ...bookInfo.rawBook,
        });

        if (newBook.displayWidth < destinationShelf._availableSpace) {
          destinationShelf.addBook(realm, newBook, true);
        } else {
          // Create new shelf
          const newShelf = realm.create(Shelf, {
            _id: new Realm.BSON.ObjectID(),
            _availableSpace: width,
            name: `Shelf ${destinationShelf.order + 1}`,
            books: [],
            shelfWidth: width,
            order: destinationShelf.order + 1,
          });

          newShelf.addBook(realm, newBook, true);
          destinationCubby!.addShelf(realm, newShelf, true);
        }

        handleModalClose();

        setBook(newBook);

        bookInfo.isInRealm = true;

        // TODO: handle successful addition. Inform user book has been added - maybe prompt to go to cubby.
      });
    },
    [realm, bookInfo, width],
  );

  const cubbyStatus = {
    backgroundColor: themeColors.main,
    opacity: 0.9,
    paddingVertical: 8,
    paddingHorizontal: 4,
  };

  const titleBlock = {
    maxWidth: width * 0.6,
    marginRight: 20,
  };

  if (!book) {
    return (
      <View>
        <AppText>Not ready to render.</AppText>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={handleModalOpacity()} stickyHeaderIndices={[2]}>
          <View style={styles.flexRow}>
            <View style={titleBlock}>
              <AppHeaderText level={2} customStyle={styles.title}>
                {book.title}
              </AppHeaderText>
              <AppHeaderText level={4}>by {book.authors}</AppHeaderText>
            </View>
            {/* TODO: Add placeholder for books with no cover */}
            {book.imageLinks && (
              <Image
                style={styles.image}
                source={{
                  uri: book.imageLinks!.thumbnail,
                }}
              />
            )}
          </View>

          <HorizontalRule />

          {/* PICK UP HERE: Now this has flex issues. Figure out WTH is going on. */}
          {bookInfo.isInRealm && (
            <View style={[styles.flexRow, cubbyStatus]}>
              <View style={styles.flex}>
                <AppText>in Cubby: {cubby?.name}</AppText>
              </View>

              <AppButton
                title="Remove book"
                options={{
                  customStyle: {width: 200, opacity: 0.7},
                }}
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
            </View>
          )}

          {!bookInfo.isInRealm && (
            <View style={[styles.flexRow, cubbyStatus]}>
              <View style={styles.flex}>
                <AppText>Not in a Cubby yet...</AppText>
              </View>

              <AppButton
                onPress={() => {
                  setBookFormVisible(true);
                  setOpacityLevel(0.25);
                }}
                title="Add to Cubby"
                options={{
                  fullWidth: false,
                  largeText: true,
                }}
              />
            </View>
          )}

          <HorizontalRule />

          <AppText>{book.categories}</AppText>
          {/* TODO: Figure out how to programmatically chunk descriptions into paragraphs. */}
          <AppText>{book.description}</AppText>

          <AddBookForm
            onSubmit={handleAddBook}
            onClose={handleModalClose}
            visible={bookFormVisible}
          />
        </ScrollView>
      </View>
    );
  }
};

function calculateBookThickness(pageCount: number, shelfWidth: number): number {
  // Average page thickness: 0.08mm. This is a rough estimate based on https://measuringstuff.com/how-thick-is-a-piece-of-paper/.
  // Add 4mm to average book cover thickness. Obviously, paperback and hardback would be very different.
  const bookThickness = Math.round(pageCount * 0.08);
  const bookWidth = Math.round((bookThickness / shelfWidth) * 100) * 10;

  return bookWidth;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  title: {
    marginTop: 0,
  },
  image: {
    resizeMode: 'cover',
    height: 175,
    width: 100,
  },
});
