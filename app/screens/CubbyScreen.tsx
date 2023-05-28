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
import {HorizontalRule} from '../baseComponents/HorizontalRule';

import {RealmContext} from '../models';

const {useRealm, useObject} = RealmContext;

const CubbyScreen: React.FC<CubbyScreenNavigationProp> = () => {
  const realm = useRealm();
  const route = useRoute<CubbyScreenRouteProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {_id} = route.params;

  const cubbyObjectId = new Realm.BSON.ObjectID(_id);
  const cubby = useObject(Cubby, cubbyObjectId);

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
        <HorizontalRule />

        {!cubby.shelves.length ? (
          <View>
            <View>
              <AppText>No books in this Cubby yet!</AppText>
            </View>
          </View>
        ) : (
          <ScrollView style={styles.flexContainer}>
            {cubby.shelves.map((shelf: Shelf) => {
              if (shelf.books.length) {
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
              } else {
                return (
                  <View>
                    <AppText>No books on this shelf.</AppText>
                  </View>
                );
              }
            })}
          </ScrollView>
        )}

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
