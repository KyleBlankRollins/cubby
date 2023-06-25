import React from 'react';
import Realm from 'realm';
import {
  View,
  Pressable,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {light, dark} from '../styles/theme';

import {Cubby} from '../models/Cubby';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';

type CubbyOverviewProps = {
  cubby: Cubby & Realm.Object;
};

export const CubbyOverview = React.memo<CubbyOverviewProps>(({cubby}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const {width} = useWindowDimensions();

  const themeColors = isDarkMode ? dark : light;

  let numberOfBooks: number = 0;

  // PICK UP HERE: Need to account for width stuff.
  const nameContainer: ViewStyle = {
    // Account for margin, padding, and constrained width.
    width: width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

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
        <View style={nameContainer}>
          <AppHeaderText
            numberOfLines={1}
            level={2}
            customStyle={styles.smallerMargin}>
            {cubby.name}
          </AppHeaderText>
          <View style={styles.infoContainer}>
            <View style={styles.books}>
              <AppText> {numberOfBooks} </AppText>
              <Icon
                name="book-multiple"
                color={themeColors.accent[300]}
                size={30}
              />
            </View>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <AppText numberOfLines={3}>{cubby.description}</AppText>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cubby: {
    alignSelf: 'stretch',
    marginVertical: 8,
  },
  overviewContainer: {
    flex: 1,
  },
  descriptionContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 0.25,
    marginTop: 10,
  },
  description: {
    paddingHorizontal: 10,
    fontSize: 17,
  },
  name: {
    paddingHorizontal: 10,
    fontSize: 25,
  },
  books: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallerMargin: {
    marginTop: 0,
  },
});
