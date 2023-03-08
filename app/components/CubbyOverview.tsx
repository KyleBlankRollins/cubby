import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, Alert, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';

import {Cubby} from '../models/Cubby';
import {AppButton} from './AppButton';

type CubbyOverviewProps = {
  cubby: Cubby & Realm.Object;
  onDelete: () => void;
};
// Pick up here. Need to add delete and maybe edit buttons.
export const CubbyOverview = React.memo<CubbyOverviewProps>(
  ({cubby, onDelete}) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    let numberOfBooks: number = 0;

    for (let index = 0; index < cubby.sections.length; index++) {
      const section = cubby.sections[index];

      numberOfBooks = numberOfBooks + section.books.length;
    }

    const createAlert = () =>
      Alert.alert(
        `${cubby.name}?`,
        'Are you sure you want to delete this Cubby?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => onDelete()},
        ],
      );

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
            <Text numberOfLines={1} style={styles.name}>
              {cubby.name}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={1} style={styles.description}>
              {cubby.description}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.books}>
            <Text> {numberOfBooks} books </Text>
          </View>
          {/* TODO: Add warning color. */}
          <AppButton title={'Delete'} onPress={createAlert} />
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  cubby: {
    height: 100,
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
