import React from 'react';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {HomeScreenNavigationProp} from '../navigation/types';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {bookAPIRaw} from '../models/bookAPIRaw';

type BookOverviewProps = {
  bookInfo: bookAPIRaw;
};

export const BookOverview: React.FC<BookOverviewProps> = props => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Pressable
      style={styles.bookContainer}
      onPress={() => {
        navigation.navigate('BookScreen', {
          book: props.bookInfo,
        });
      }}>
      <View>
        {props.bookInfo.cover && (
          <Image
            style={styles.image}
            source={{
              uri: props.bookInfo.cover!.medium,
            }}
          />
        )}
      </View>
      <View>
        <AppHeaderText level={3}>{props.bookInfo.title}</AppHeaderText>

        <FlatList
          data={props.bookInfo.authors}
          renderItem={({item}) => <Item name={item.name} />}
          keyExtractor={author => author.name}
        />

        <FlatList
          data={props.bookInfo.publishers}
          renderItem={({item}) => <Item name={item.name} />}
          keyExtractor={author => author.name}
        />

        <AppText>{props.bookInfo.number_of_pages} pages</AppText>
      </View>
    </Pressable>
  );
};

type ItemProps = {name: string};

const Item = ({name}: ItemProps) => (
  <View>
    <AppText>{name}</AppText>
  </View>
);

const styles = StyleSheet.create({
  bookContainer: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: 125,
    marginRight: 10,
  },
});
