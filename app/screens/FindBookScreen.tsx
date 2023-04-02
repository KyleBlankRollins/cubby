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
import {GBOOKS_API_KEY, DEVICE_SHA} from '@env';

import {Cubby} from '../models/Cubby';
import {Section} from '../models/Section';
import {RealmContext} from '../models';
import {RawBook} from '../models/gBookApiRaw';
import {Book} from '../models/Book';

const {useRealm} = RealmContext;

export const FindBookScreen: React.FC<FindBookScreenNavigationProp> = () => {
  const realm = useRealm();
  const [gBookId, setgBookId] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState();
  const [findBookButtonText, setFindBookButtonText] = useState('Find book');
  const [resultMessage, setResultMessage] = useState('Search results here...');

  // TODO: rewrite as serverless function
  // TODO: Add options for search: author (inauthor), subject (subject), isbn (isbn)
  // TODO: Use Partial Response to get only the fields I want.
  // https://developers.google.com/books/docs/v1/performance#partial-response
  const requestBookByTitle = async () => {
    const SHA1 = DEVICE_SHA;
    const PACKAGE_NAME = 'com.cubby';
    const HEADERS = {
      'Content-Type': 'application/json',
      'X-Android-Package': PACKAGE_NAME,
      'X-Android-Cert': SHA1,
    };
    const APIKEY = GBOOKS_API_KEY;
    const FETCH_LINK = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&printType=books&key=${APIKEY}`;

    await fetch(FETCH_LINK, {headers: HEADERS})
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        if (data.items && data.items.length) {
          setResult(data.items);
          setQuery('');
          setFindBookButtonText('Find another book');
          setResultMessage("Here's what we found!");

          return data.items;
        } else {
          setResultMessage(
            `Hmm... Couldn't find any books with titles that contain "${query}".`,
          );

          return;
        }
      })
      .catch(error => {
        console.error(`Failed request: ${error.message}`);
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

      <View>
        <AppText>{resultMessage}</AppText>
        {result && (
          <FlatList
            style={styles.searchList}
            data={result}
            keyExtractor={result => result.id.toString()}
            numColumns={2}
            renderItem={({item}) => {
              return <BookOverview bookInfo={item} />;
            }}
          />
        )}
      </View>

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
  searchList: {
    // width: '100%',
    marginVertical: 40,
  },
});
