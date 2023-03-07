import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';

import {AppButton} from '../components/AppButton';

import {RealmContext} from '../models';
const {useRealm, useQuery} = RealmContext;
// TODO: TypeScriptify this component
export function BookOverview({bookId}) {
  const id = JSON.parse(bookId);
  const realm = useRealm();
  const book = useQuery('Book').filtered(`_id == oid(${id})`)[0];

  return (
    <View>
      <Text>{book.title}</Text>
      <Text>{book.description}</Text>

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
}
