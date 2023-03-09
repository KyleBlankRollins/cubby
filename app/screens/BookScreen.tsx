import React from 'react';
import {FlatList, Image, ListRenderItem, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {bookAPIRaw} from '../models/bookAPIRaw';

type BookScreenProps = {
  bookInfo: bookAPIRaw;
};

export const BookScreen: React.FC<BookScreenProps> = props => {
  const navigation = useNavigation();

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
        {/* TODO: Need to get section id here and pass it to AddBook so it's easier to query the section. */}
        {/* TODO: Re-evaluate how to add. Need an "AddBookForm"
        that's handled similarly to "AddCubbyForm". */}
        {/* <AppButton
          title="Add book to Cubby"
          onPress={() => {
            navigation.navigate('Add a book', {
              section: JSON.stringify(sectionInfo),
              book: JSON.stringify(bookInfo),
            });
          }}
        /> */}
      </View>
      <View>
        <AppText>{props.bookInfo.title}</AppText>

        <AppText>Author(s)</AppText>
        <FlatList
          data={props.bookInfo.authors}
          renderItem={({item}) => <Item name={item.name} />}
          keyExtractor={author => author.name}
        />

        <AppText>Subjects</AppText>
        <FlatList
          data={props.bookInfo.subjects}
          renderItem={({item}) => <Item name={item.name} />}
          keyExtractor={subject => subject.url}
        />
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
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: 125,
    marginRight: 10,
  },
});
