import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {BookOverview} from '../components/BookOverview';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';

import {RealmContext} from '../models';
const {useQuery} = RealmContext;
// TODO: TypeScriptify this component
export function CubbySection({sectionId}) {
  const navigation = useNavigation();
  const id = JSON.parse(sectionId);
  const section = useQuery('Section').filtered(`_id == oid(${id})`)[0];

  const sectionStyles = {
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 4,
    borderColor: section.colors.highlight,
    backgroundColor: section.colors.main,
  };

  return (
    <View style={sectionStyles}>
      <AppText>{section.name}</AppText>

      <AppButton
        title="Add book"
        options={{fullWidth: true}}
        onPress={() => {
          navigation.navigate('Find a book', {
            section: JSON.stringify({
              id: section._id,
              name: section.name,
            }),
          });
        }}
      />

      {/* TODO: Need to handle if Realm isn't working and/or 
      cubby isn't available. */}
      {/* TODO: Check if there are any books. show "add book" if not */}
      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexGrow: 1,
        }}>
        {section.books.map((book, index) => {
          return <BookOverview key={index} bookId={JSON.stringify(book._id)} />;
        })}
      </ScrollView>
    </View>
  );
}
