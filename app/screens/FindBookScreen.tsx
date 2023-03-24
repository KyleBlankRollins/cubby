import React, {useState, useCallback} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {FindBookScreenNavigationProp} from '../navigation/types';
import {BookOverview} from '../components/BookOverview';

import {Cubby} from '../models/Cubby';
import {Section} from '../models/Section';
import {RealmContext} from '../models';

const {useRealm} = RealmContext;

export const FindBookScreen: React.FC<FindBookScreenNavigationProp> = () => {
  const [gBookId, setgBookId] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState();
  const [findBookButtonText, setFindBookButtonText] = useState('Find book');

  // TODO: rewrite as serverless function
  const requestBookByTitle = async () => {
    const SHA1 = '5E8F16062EA3CD2C4A0D547876BAA6F38CABF625';
    const PACKAGE_NAME = 'com.cubby';
    const HEADERS = {
      'Content-Type': 'application/json',
      'X-Android-Package': PACKAGE_NAME,
      'X-Android-Cert': SHA1,
    };
    const FETCH_LINK = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&projection=lite&key=AIzaSyBDmJ0rDzfzU6WrfCpsPhWDoiiVsHy5hNM`;

    await fetch(FETCH_LINK, {headers: HEADERS})
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        setResult(data.items);
        setQuery('');
        setFindBookButtonText('Find another book');

        // TODO: check if gBookId matches a book _id in realm.

        return;
      })
      .catch(error => {
        Alert.alert(`Failed request: ${error.message}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* TODO: Add different search options. Like by author. */}
        {!result && <AppText>Search for a book by its title</AppText>}

        <TextInput
          style={styles.input}
          onChangeText={setQuery}
          value={query}
          placeholder="Example: Howl's Moving Castle"
          // keyboardType="numeric"
        />

        <AppButton
          title={findBookButtonText}
          onPress={() => {
            requestBookByTitle();
          }}
        />
      </View>

      {result && result.length && (
        <FlatList
          data={result}
          keyExtractor={result => result.id.toString()}
          renderItem={({item}) => {
            return <BookOverview bookInfo={item} />;
          }}
        />
      )}

      {/* TODO: If book is already in realm, pass the Book object. If not, pass basic info. */}
      {/* TODO: add prop for `isInRealm`. */}
      {/* {bookInfo && <BookOverview bookInfo={result} />} */}
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
