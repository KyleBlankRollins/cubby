import React from 'react';
import {Alert, View, StyleSheet, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {CubbyScreenNavigationProp} from '../navigation/types';
import {HomeScreenNavigationProp} from '../navigation/types';
import {CubbyScreenRouteProp} from '../navigation/types';

import {Cubby} from '../models/Cubby';
import {Shelf} from '../models/Shelf';

import {BookSlot} from '../components/BookSlot';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';

import {RealmContext} from '../models';

const {useRealm, useObject, useQuery} = RealmContext;

// class Shelf {
//   _id!: Realm.BSON.ObjectId;
//   books!: Book[];
//   shelfWidth!: number;
//   order!: number;
//   _availableSpace!: number;

//   constructor(shelfWidth: number, order: number) {
//     this._id = new Realm.BSON.ObjectID();
//     this.books = [];
//     this.shelfWidth = shelfWidth;
//     this._availableSpace = shelfWidth;
//     this.order = order;
//   }

//   get getAvailableSpace() {
//     return this._availableSpace;
//   }

//   get getBooks() {
//     return this.books;
//   }

//   setAvailableSpace() {
//     let spaceTaken = 0;

//     if (!this.books.length) {
//       return spaceTaken;
//     }

//     for (let index = 0; index < this.books.length; index++) {
//       const book = this.books[index];
//       const bookThickness = book.pageCount
//         ? Math.round(book.pageCount * 0.08)
//         : 10;
//       const bookWidth = Math.round((bookThickness / this.shelfWidth) * 100);

//       // PICK UP HERE: Need to reconcile this with actual book item width. Ideally, I can pass this on and not need to recalculate.
//       // Look at calculateBookThickness() in `BookSlot`.
//       const bookDisplayWidth = bookWidth * 10;

//       spaceTaken = spaceTaken + bookDisplayWidth;
//     }

//     this._availableSpace = this.shelfWidth - spaceTaken;
//   }

//   addBook(book: Book) {
//     this.books.push(book);

//     this.setAvailableSpace();
//   }
// }

const CubbyScreen: React.FC<CubbyScreenNavigationProp> = () => {
  const realm = useRealm();
  const route = useRoute<CubbyScreenRouteProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {_id} = route.params;

  const cubbyObjectId = new Realm.BSON.ObjectID(_id);
  const cubby = useObject(Cubby, cubbyObjectId);
  const shelves = useQuery(Shelf);

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

        <ScrollView style={styles.flexContainer}>
          {shelves.map((shelf: Shelf) => {
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

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
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
    marginBottom: 30,
    alignItems: 'flex-end',
  },
});

export default CubbyScreen;
