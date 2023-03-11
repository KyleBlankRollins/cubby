import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {AppButton} from '../baseComponents/AppButton';
import {AddBookForm} from './AddBookForm';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {bookAPIRaw} from '../models/bookAPIRaw';

type BookOverviewProps = {
  bookInfo: bookAPIRaw;
  onSubmit: (description: string, name: string) => void;
  onClose: () => void;
  visible: boolean;
};

export const BookOverview: React.FC<BookOverviewProps> = props => {
  return (
    <View style={styles.bookContainer}>
      <View>
        {props.bookInfo.cover && (
          <Image
            style={styles.image}
            source={{
              uri: props.bookInfo.cover!.medium,
            }}
          />
        )}
        <AddBookForm
          bookInfo={props.bookInfo}
          onSubmit={props.onSubmit}
          onClose={props.onClose}
          visible={props.visible}
        />
        {/* TODO: Add a View Details button that goes to BookScreen and adds BookInfo as a prop. */}
        {/* <AppButton
          title="More details"
          onPress={() => {
            navigation.navigate('BookScreen', {
              bookInfo: bookInfo,
            });
          }}
        /> */}
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
    </View>
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
