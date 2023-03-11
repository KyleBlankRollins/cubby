import React, {useState, useCallback} from 'react';
import {Alert, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {BookScreenNavigationProp} from '../navigation/types';
import {BookOverview} from '../components/BookOverview';

import {Cubby} from '../models/Cubby';
import {Section} from '../models/Section';
import {RealmContext} from '../models';

const {useRealm} = RealmContext;

export const FindBookScreen: React.FC<BookScreenNavigationProp> = () => {
  const realm = useRealm();
  const [bookFormVisible, setBookFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);
  const [isbn, setIsbn] = useState('');
  const [bookInfo, setBookInfo] = useState(undefined);
  const [findBookButtonText, setFindBookButtonText] = useState('Find book');

  // TODO: rewrite as serverless function
  const requestBook = async () => {
    // TODO: Test for malformed ISBNs before submitting request.
    // Request book info from Book API: https://openlibrary.org/dev/docs/api/books
    await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`,
    )
      // fetch(`https://openlibrary.org/isbn/${isbn}.json`)
      .then(response => response.json())
      .then(response => JSON.stringify(response))
      .then(jsonString => JSON.parse(jsonString))
      .then(jsonObject => {
        setBookInfo(jsonObject[`ISBN:${isbn}`]);
        setIsbn('');
        setFindBookButtonText('Find another book');

        return;
      })
      .catch(error => {
        Alert.alert(`Failed request: ${error.message}`);
      });
  };

  const handleAddBook = useCallback(
    (description: string, name: string): void => {
      // TODO: Add alert about needing these.
      if (!description || !name) {
        return;
      }

      realm.write(() => {
        const defaultSection: Section = realm.create(
          'Section',
          Section.generate('default section', {
            main: '#DDD382',
            highlight: '#D65F28',
          }),
        );

        const newCubby: Cubby = realm.create(
          'Cubby',
          Cubby.generate(name, description),
        );

        newCubby.sections.push(defaultSection);

        handleModalClose();

        return newCubby;
      });
    },
    [realm],
  );

  const handleModalClose = () => {
    setBookFormVisible(false);
    setOpacityLevel(1);
  };

  const handleModalOpacity = () => {
    return {
      opacity: opacityLevel,
    };
  };

  return (
    <SafeAreaView style={[styles.container, handleModalOpacity()]}>
      <View>
        <AppText>Enter a book's ISBN and get information about it!</AppText>
        <AppText selectable={true}>
          {' '}
          For example:
          <AppText>9781250214713</AppText>
        </AppText>
        <TextInput
          style={styles.input}
          onChangeText={setIsbn}
          value={isbn}
          placeholder="9781250214713"
          keyboardType="numeric"
        />

        <AppButton
          title={findBookButtonText}
          onPress={() => {
            requestBook();
          }}
        />
      </View>

      {bookInfo && (
        <BookOverview
          bookInfo={bookInfo}
          onSubmit={handleAddBook}
          onClose={handleModalClose}
          visible={bookFormVisible}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
});
