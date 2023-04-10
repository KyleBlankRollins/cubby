import React from 'react';
import Realm from 'realm';
import {View, Pressable, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';

import {Cubby} from '../models/Cubby';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';

type CubbyOverviewProps = {
  cubby: Cubby & Realm.Object;
};

export const CubbyOverview = React.memo<CubbyOverviewProps>(({cubby}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  let numberOfBooks: number = 0;

  for (let index = 0; index < cubby.shelves.length; index++) {
    const shelf = cubby.shelves[index];

    numberOfBooks = numberOfBooks + shelf.books.length;
  }

  return (
    <Pressable
      style={styles.cubby}
      onPress={() =>
        navigation.navigate('CubbyScreen', {
          name: cubby.name,
          _id: cubby._id.toString(),
        })
      }>
      <View style={styles.overviewContainer}>
        <View style={styles.nameContainer}>
          <AppHeaderText numberOfLines={1} level={2}>
            {cubby.name}
          </AppHeaderText>
        </View>
        <View style={styles.descriptionContainer}>
          <AppText numberOfLines={1}>{cubby.description}</AppText>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.books}>
          <AppText> {numberOfBooks} books </AppText>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cubby: {
    height: 150,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    // ...shadows,
  },
  overviewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 0.25,
    justifyContent: 'center',
    marginTop: 20,
  },
  description: {
    paddingHorizontal: 10,
    fontSize: 17,
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  name: {
    paddingHorizontal: 10,
    fontSize: 25,
  },
  books: {
    justifyContent: 'center',
  },
});
