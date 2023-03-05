import React from 'react';
import Realm from 'realm';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {shadows} from '../styles/shadows';
import colors from '../styles/colors';
import {Cubby} from '../models/Cubby';

type CubbyOverviewProps = {
  cubby: Cubby & Realm.Object;
  onDelete: () => void;
};

export const CubbyOverview = React.memo<CubbyOverviewProps>(
  ({cubby, onDelete}) => {
    return (
      // TODO: Change this to <Pressable> and navigate to cubby view on press.
      <View style={styles.cubby}>
        {/* <Pressable
          onPress={onToggleStatus}
          style={[styles.status, task.isComplete && styles.completed]}>
          <Text style={styles.icon}>{task.isComplete ? '✓' : '○'}</Text>
        </Pressable> */}
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
            <Text style={styles.bookText}> {cubby.books.length} books </Text>
          </View>
          {/* TODO: Move delete functionality to Cubby view */}
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  cubby: {
    height: 100,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: colors.white,
    ...shadows,
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
    color: colors.black,
    fontSize: 17,
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  name: {
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 25,
  },
  books: {
    flex: 0.25,
    justifyContent: 'center',
  },
  bookText: {
    color: colors.black,
  },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    flex: 0.75,
    justifyContent: 'center',
    // TODO: give a warning color
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
