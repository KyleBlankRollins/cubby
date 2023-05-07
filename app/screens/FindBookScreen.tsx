import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  View,
  useColorScheme,
  Keyboard,
  Pressable,
} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {SearchParameter} from '../components/SearchParameter';

import {GBOOKS_API_KEY, DEVICE_SHA} from '@env';

import {light, lightStyles, dark, darkStyles} from '../styles/theme';
import {AppButtonText} from '../baseComponents/AppButtonText';
import {AdvancedSearchForm} from '../components/AdvancedSearchForm';

export const FindBookScreen = ({navigation}) => {
  const [result, setResult] = useState();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [isbn, setIsbn] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const fullThemeStyles = isDarkMode ? dark : light;

  const SHA1 = DEVICE_SHA;
  const PACKAGE_NAME = 'com.cubby';
  const HEADERS = {
    'Content-Type': 'application/json',
    'X-Android-Package': PACKAGE_NAME,
    'X-Android-Cert': SHA1,
  };
  const APIKEY = GBOOKS_API_KEY;

  const requestAdvancedSearch = async () => {
    const querySubstrings = {
      bookTitle: bookTitle ? `intitle:${bookTitle}` : '',
      author: author ? `inauthor:${author}` : '',
      subject: subject ? `subject:${subject}` : '',
      isbn: isbn ? `isbn:${isbn}` : '',
    };

    const dynamicQueryString = () => {
      let constructedString: string;

      for (const key in querySubstrings) {
        if (Object.prototype.hasOwnProperty.call(querySubstrings, key)) {
          const substring = querySubstrings[key];

          if (substring && !constructedString) {
            constructedString = substring;
          } else if (substring) {
            constructedString = `${constructedString}+${substring}`;
          }
        }
      }

      return constructedString.trim();
    };

    const DYNAMIC_FETCH_LINK = `https://www.googleapis.com/books/v1/volumes?q=${dynamicQueryString()}&printType=books&key=${APIKEY}`;

    const results = await fetch(DYNAMIC_FETCH_LINK, {headers: HEADERS})
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Failed request: ${error.message}`);
        Alert.alert(`Failed request: ${error.message}`);
      });

    return results;
  };

  // TODO: rewrite as serverless function
  // TODO: Use Partial Response to get only the fields I want.
  // https://developers.google.com/books/docs/v1/performance#partial-response
  const requestBookByTitle = async () => {
    const FETCH_LINK = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&printType=books&key=${APIKEY}`;

    const results = await fetch(FETCH_LINK, {headers: HEADERS})
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .catch(error => {
        console.error(`Failed request: ${error.message}`);
        Alert.alert(`Failed request: ${error.message}`);
      });

    return results;
  };

  const clearResults = (mutationType: string) => {
    handleMutations(mutationType, '');

    setResult(undefined);
  };

  const handleSearchRequest = async () => {
    let data;

    if (showAdvancedSearch) {
      data = await requestAdvancedSearch();

      setResult(data.items);
    } else {
      data = await requestBookByTitle();

      setResult(data.items);
    }

    if (!data.items) {
      Alert.alert(`Couldn't find a book with: ${bookTitle}`);
    } else {
      navigation.navigate('SearchResultsScreen', {
        results: data.items,
      });
    }
  };

  const handleMutations = (mutationType: string, mutation: string) => {
    const setters = {
      title: setBookTitle,
      author: setAuthor,
      subject: setSubject,
      isbn: setIsbn,
    };

    setters[mutationType](mutation);
  };

  // TODO: Add loading indicator when fetching results.
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.searchContainer}>
        {!result && <AppText>Try searching for a book!</AppText>}

        <View style={styles.searchInput}>
          {showAdvancedSearch ? (
            // Shows more fields to search by.
            // TODO: Fix layout and style issues.
            <AdvancedSearchForm
              values={{bookTitle, author, subject, isbn}}
              handleMutations={handleMutations}
              onClearResults={clearResults}
            />
          ) : (
            // Default view that shows only searching by title.
            <ScrollView>
              <SearchParameter
                value={bookTitle}
                parameterType="title"
                placeholderText="Book title..."
                handleMutations={handleMutations}
                onSubmitEditing={() => {
                  Keyboard.dismiss;
                  requestBookByTitle();
                }}
                onClearResults={() => {
                  clearResults('title');
                }}
              />
            </ScrollView>
          )}
        </View>

        <View style={styles.buttonGroup}>
          <AppButton
            title={'Advanced search'}
            onPress={() => {
              setShowAdvancedSearch(!showAdvancedSearch);
            }}
          />
          <AppButton
            title={'Find book'}
            onPress={() => {
              handleSearchRequest();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 14,
    marginVertical: 10,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
});
