import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';

import {RealmContext} from '../models';
import {Book} from '../models/Book';
const {useRealm, useQuery} = RealmContext;

type BookScreenProps = {
  bookId: string;
};

export const BookScreen: React.FC<BookScreenProps> = props => {
  const id = JSON.parse(props.bookId);
  const realm = useRealm();
  const result = useQuery(Book);
  const book = result.filtered(`_id == oid(${id})`)[0];

  return (
    <View>
      <AppHeaderText level={3}>{book.title}</AppHeaderText>
      <AppText>{book}</AppText>

      {/* TODO: Add placeholder for books with no cover */}
      {book.cover && book.cover.medium && (
        <Image
          style={{
            resizeMode: 'cover',
            height: 200,
            width: 125,
            marginRight: 10,
          }}
          source={{
            uri: book.cover.medium,
          }}
        />
      )}

      <AppButton
        title="Delete book"
        onPress={() => {
          //TODO: add confirmation
          realm.write(() => {
            realm.delete(book);
          });
        }}
      />
    </View>
  );
};
