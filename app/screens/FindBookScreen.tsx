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
import {RawBook} from '../models/gBookApiRaw';
import {Book} from '../models/Book';

const {useRealm} = RealmContext;

export const FindBookScreen: React.FC<FindBookScreenNavigationProp> = () => {
  const realm = useRealm();
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
    const APIKEY = 'AIzaSyBDmJ0rDzfzU6WrfCpsPhWDoiiVsHy5hNM';
    const FETCH_LINK = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&projection=lite&key=${APIKEY}`;

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
        return data.items;
      })
      .then(books => {
        for (const book of books) {
          checkAgainstRealm(book);
        }

        return;
      })
      .catch(error => {
        console.error(`Failed request: ${error.message}`);
        Alert.alert(`Failed request: ${error.message}`);
      });
  };

  const checkAgainstRealm = rawBook => {
    // Check each book that's returned to see if it's already in
    // the realm.
    // TODO: Consider if there's a better way to do this check.
    const isInRealm = realm.objectForPrimaryKey(Book, rawBook.id);

    // PICK UP HERE: this if check isn't working
    if (isInRealm) {
      rawBook.isInRealm = true;
    } else {
      rawBook.isInRealm = false;
      return;
    }
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
