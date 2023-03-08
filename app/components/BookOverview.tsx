import {StyleSheet, View, Image, ScrollView} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';

import {RealmContext} from '../models';
const {useRealm, useQuery} = RealmContext;
// TODO: TypeScriptify this component
export function BookOverview({bookId}) {
  const id = JSON.parse(bookId);
  const realm = useRealm();
  const book = useQuery('Book').filtered(`_id == oid(${id})`)[0];

  return (
    <View>
      <AppHeaderText level={3}>{book.title}</AppHeaderText>
      <AppText>{book.description}</AppText>

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
