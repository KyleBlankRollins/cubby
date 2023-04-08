import React, {useState} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {CubbyScreenNavigationProp} from '../navigation/types';
import {HomeScreenNavigationProp} from '../navigation/types';
import {CubbyScreenRouteProp} from '../navigation/types';
import {Cubby} from '../models/Cubby';
import {Book} from '../models/Book';

import {BookSlot} from '../components/BookSlot';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';

import {RealmContext} from '../models';

const {useRealm, useObject} = RealmContext;

// TODO: Extract as an object model.
class Shelf {
  _id!: Realm.BSON.ObjectId;
  books!: Book[];
  shelfWidth!: number;
  order!: number;
  _availableSpace!: number;

  constructor(shelfWidth: number, order: number) {
    this._id = new Realm.BSON.ObjectID();
    this.books = [];
    this.shelfWidth = shelfWidth;
    this._availableSpace = shelfWidth;
    this.order = order;
  }

  get getAvailableSpace() {
    return this._availableSpace;
  }

  get getBooks() {
    return this.books;
  }

  setAvailableSpace() {
    let spaceTaken = 0;

    if (!this.books.length) {
      return spaceTaken;
    }

    for (let index = 0; index < this.books.length; index++) {
      const book = this.books[index];
      const bookWidth = book.pageCount
        ? Math.round((book.pageCount / this.shelfWidth) * 10) / 10
        : 1;
      const bookDisplayWidth = bookWidth * 100;

      spaceTaken = spaceTaken + bookDisplayWidth;
    }

    this._availableSpace = this.shelfWidth - spaceTaken;
  }

  addBook(book: Book) {
    this.books.push(book);

    this.setAvailableSpace();
  }
}

const CubbyScreen: React.FC<CubbyScreenNavigationProp> = () => {
  const realm = useRealm();
  const route = useRoute<CubbyScreenRouteProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {width, height} = useWindowDimensions();

  const {_id} = route.params;

  const [shelfWidth, setShelfWidth] = useState(width);

  const cubbyObjectId = new Realm.BSON.ObjectID(_id);
  const cubby = useObject(Cubby, cubbyObjectId);
  const books = cubby?.sections[0].books;

  const allShelves = shelves(books, width, shelfWidth);

  const createAlert = () =>
    Alert.alert(
      `${cubby!.name}`,
      'Are you sure you want to delete this Cubby?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => handleDeleteCubby(cubby)},
      ],
    );

  const handleDeleteCubby = (
    cubbyToDelete: (Cubby & Realm.Object<Cubby, never>) | null,
  ): void => {
    realm.write(() => {
      realm.delete(cubbyToDelete);
    });

    navigation.navigate('CubbyManager');
  };

  if (!cubby) {
    return <AppText>Couldn't find a cubby...</AppText>;
  } else {
    return (
      <View style={styles.cubbyContainer}>
        <AppText>{cubby!.description}</AppText>

        <ScrollView>
          {allShelves.map((shelf: Shelf) => {
            return (
              <ScrollView
                key={shelf._id.toString()}
                scrollEnabled={false}
                horizontal={true}
                contentContainerStyle={styles.bookShelf}>
                {shelf.books.map(book => {
                  return <BookSlot key={book._id.toString()} book={book} />;
                })}
              </ScrollView>
            );
          })}
        </ScrollView>

        <View style={styles.buttonGroup}>
          <AppButton
            title="Delete Cubby"
            options={{bgColor: '#5F2234', fullWidth: true}}
            onPress={createAlert}
          />
        </View>
      </View>
    );
  }
};

function shelves(
  books: Realm.list<Book> | undefined,
  width: number,
  shelfWidth: number,
) {
  const newShelves: Shelf[] = [];
  let currentShelf;
  let availableSpace;

  for (let index = 0; index < books!.length; index++) {
    const book = books![index];

    const bookWidth = book.pageCount
      ? Math.round((book.pageCount / width) * 10) / 10
      : 1;
    const bookDisplayWidth = bookWidth * 100;
    const bookHeight = book.title.length;
    // TODO: Maybe update book object with this.
    const bookDisplayHeight = bookHeight * 10;

    if (!newShelves.length) {
      const newShelf = new Shelf(shelfWidth, 0);

      newShelves.push(newShelf);
      currentShelf = newShelf;
      availableSpace = currentShelf.getAvailableSpace;
    } else {
      // Get the last shelf in the array.
      currentShelf = newShelves[newShelves.length - 1];
      availableSpace = currentShelf.getAvailableSpace;
    }

    if (bookDisplayWidth > availableSpace) {
      // TODO: abstract to re-useable function: createShelf
      const newShelf = new Shelf(shelfWidth, newShelves.length);

      newShelf.addBook(book);
      newShelves.push(newShelf);
      currentShelf = newShelf;
      availableSpace = currentShelf.getAvailableSpace;
    } else {
      currentShelf.addBook(book);
    }
  }

  return newShelves;
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
  cubbyContainer: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  bookShelf: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
});

export default CubbyScreen;
