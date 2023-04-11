import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
  Keyboard,
  Pressable,
} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {FindBookScreenNavigationProp} from '../navigation/types';
import {BookOverview} from '../components/BookOverview';
import {GBOOKS_API_KEY, DEVICE_SHA} from '@env';

import {light, lightStyles, dark, darkStyles} from '../styles/theme';
import {AppButtonText} from '../baseComponents/AppButtonText';
import {AdvancedSearchForm} from '../components/AdvancedSearchForm';

// TODO: Add advanced search toggle and options: author (inauthor), subject (subject), isbn (isbn)

export const FindBookScreen: React.FC<FindBookScreenNavigationProp> = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState();
  const [findBookButtonText, setFindBookButtonText] = useState('Find book');
  const [resultMessage, setResultMessage] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const fullThemeStyles = isDarkMode ? dark : light;

  const handleModalClose = () => {
    setShowAdvancedSearch(false);
    setOpacityLevel(1);
  };

  const handleModalOpacity = () => {
    return {
      opacity: opacityLevel,
    };
  };

  const handleAdvancedSearchSubmission = (
    bookTitle?: string,
    authorName?: string,
    subject?: string,
    isbn?: string,
  ) => {
    console.log(bookTitle);
    console.log(authorName);
    console.log(subject);
    console.log(isbn);

    // PICK UP HERE: Craft a refined search based on available parameters.

    handleModalClose();
  };

  // TODO: rewrite as serverless function
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
          // setQuery('');
          setFindBookButtonText('Find another book');
          setResultMessage("Is this what you're looking for?");

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

  const clearResults = () => {
    setResult(undefined);
    setResultMessage('');
  };

  return (
    <View style={[styles.container, handleModalOpacity()]}>
      <KeyboardAvoidingView style={styles.searchContainer}>
        {/* TODO: Add different search options. Like by author. */}
        {!result && <AppText>Try searching for a book!</AppText>}

        <View style={styles.searchInput}>
          <TextInput
            style={[styles.input, themeStyles.surface3]}
            onChangeText={setQuery}
            value={query}
            placeholder="Book title..."
            placeholderTextColor={fullThemeStyles.text2}
            onSubmitEditing={() => {
              Keyboard.dismiss;
              requestBookByTitle();
            }}
          />

          <Pressable
            style={[styles.searchInputClear, themeStyles.surface2]}
            onPress={() => {
              clearResults();
            }}>
            <AppButtonText>X</AppButtonText>
          </Pressable>
        </View>

        <View style={styles.buttonGroup}>
          <AppButton
            title={findBookButtonText}
            onPress={() => {
              requestBookByTitle();
            }}
          />
          <AppButton
            title={'Advanced search'}
            onPress={() => {
              setShowAdvancedSearch(true);
              setOpacityLevel(0.25);
            }}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.resultsContainer}>
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

      <AdvancedSearchForm
        onSubmit={handleAdvancedSearchSubmission}
        onClose={handleModalClose}
        visible={showAdvancedSearch}
      />
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
  resultsContainer: {
    flex: 3,
  },
  searchInput: {
    position: 'relative',
  },
  searchInputClear: {
    position: 'absolute',
    right: '5%',
    top: '25%',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  searchList: {
    marginVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
});
