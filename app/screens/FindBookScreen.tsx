import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {BookScreenNavigationProp} from '../navigation/types';
// import {BookView} from './BookView';
// TODO: TypeScriptify this component
export const FindBookScreen: React.FC<BookScreenNavigationProp> = () => {
  // const sectionInfo = JSON.parse(route.params.section);
  const [isbn, setIsbn] = useState('');
  const [bookInfo, setBookInfo] = useState('');
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

        setFindBookButtonText('Find another book');

        return;
      })
      .catch(error => {
        Alert.alert(`Failed request: ${error.message}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
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
            console.log('find book selected');
            requestBook();
          }}
        />
      </View>

      <ScrollView>
        <AppText>{JSON.stringify(bookInfo, null, 2)}</AppText>
      </ScrollView>

      {/* {bookInfo && <BookView bookInfo={bookInfo} sectionInfo={sectionInfo} />} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  logo: {
    width: 300,
    height: 200,
  },
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
