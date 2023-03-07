import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';

// import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Cubby} from '../models/Cubby';

type CubbyOverviewProps = {
  cubby: Cubby & Realm.Object;
  onDelete: () => void;
};

export const CubbyOverview = React.memo<CubbyOverviewProps>(
  ({cubby, onDelete}) => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
      // TODO: Change this to <Pressable> and navigate to cubby view on press.
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
          {/* <View style={styles.books}>
            <Text style={styles.bookText}> {cubby.books.length} books </Text>
          </View> */}
          {/* TODO: Move delete functionality to Cubby view */}
          {/* <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable> */}
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
    flex: 0.25,
    justifyContent: 'center',
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  deleteButton: {
    flex: 0.75,
    justifyContent: 'center',
    // TODO: give a warning color
  },
  deleteText: {
    marginHorizontal: 10,
    fontSize: 17,
  },
  icon: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
