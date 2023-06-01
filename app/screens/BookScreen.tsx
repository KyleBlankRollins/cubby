import React, {useState, useCallback, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  ScrollView,
  useColorScheme,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {BookScreenNavigationProp} from '../navigation/types';
import {HomeScreenNavigationProp} from '../navigation/types';
import {BookScreenRouteProp} from '../navigation/types';
import {light, dark} from '../styles/theme';

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

  const themeColors = isDarkMode ? dark : light;

  const createAlert = () =>
    Alert.alert(
      `${book!.title}`,
      'Are you sure you want to remove this book?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleRemoveBook(book as Book)},
      ],
    );

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

  const handleRemoveBook = (
    bookToRemove: (Book & Realm.Object<Book, never>) | null,
  ): void => {
    realm.write(() => {
      realm.delete(bookToRemove);
    });

    setBook(undefined);

    bookInfo.isInRealm = false;

    // @ts-ignore
    navigation.navigate('CubbyScreen', {
      name: cubby!.name,
      _id: cubby!._id.toString(),
    });
  };

  const handleAddBook = useCallback(
    (destinationCubbyId: Realm.BSON.ObjectId | undefined): void => {
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

  const cubbyStatus: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: themeColors.main,
    opacity: 0.9,
    paddingVertical: 8,
    paddingHorizontal: 4,
  };

  const titleBlock: ViewStyle = {
    maxWidth: width * 0.6,
    marginRight: 20,
  };

  const categoryLabel: ViewStyle = {
    backgroundColor: themeColors.main,
    alignSelf: 'center',
    paddingHorizontal: 8,
    elevation: 4,
    marginBottom: 20,
  };

  // TODO: Improve formatting, move transformation to when book is created.
  const formattedDescription = book?.description
    ? book?.description.replace(/•/g, '\n•').replace(/\.(\s+)(?!\.)/g, '.\n\n')
    : "Couldn't find a description for this book...";

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

          {bookInfo.isInRealm && (
            <View style={styles.flex}>
              <View style={cubbyStatus}>
                <AppText customStyle={styles.cubbyName}>{cubby?.name}</AppText>

                <AppButton title="Remove book" onPress={createAlert} />
              </View>
            </View>
          )}

          {!bookInfo.isInRealm && (
            <View style={styles.flex}>
              <View style={[styles.flexRow, cubbyStatus]}>
                <AppText customStyle={styles.cubbyName}>Not added...</AppText>

                <AppButton
                  onPress={() => {
                    setBookFormVisible(true);
                    setOpacityLevel(0.25);
                  }}
                  title="Add to Cubby"
                />
              </View>
            </View>
          )}

          <HorizontalRule />

          {book.categories
            ? book.categories.map((category: string) => {
                return (
                  <CategoryLabelElement
                    category={category}
                    categoryStyle={categoryLabel}
                  />
                );
              })
            : null}

          <AppText>{formattedDescription}</AppText>

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

type categoryProp = {
  category: string;
  categoryStyle: ViewStyle;
};

const CategoryLabelElement: React.FC<categoryProp> = ({
  category,
  categoryStyle,
}) => {
  return (
    <View style={categoryStyle}>
      <AppText>{category}</AppText>
    </View>
  );
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
  cubbyName: {
    marginVertical: 0,
    marginRight: 20,
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: 175,
    width: 100,
  },
});
