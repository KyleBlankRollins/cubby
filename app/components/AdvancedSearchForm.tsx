import React from 'react';
import {StyleSheet, Keyboard, ScrollView} from 'react-native';

import {SearchParameter} from './SearchParameter';

type AdvancedSearchFormProps = {
  values: {
    bookTitle: string;
    author: string;
    subject: string;
    isbn: string;
  };
  handleMutations: (mutationType: string, mutation: string) => void;
  onClearResults: (mutationType: string) => void;
};

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  values,
  handleMutations,
  onClearResults,
}) => {
  return (
    <ScrollView style={styles.container}>
      <SearchParameter
        value={values.bookTitle}
        parameterType="title"
        placeholderText="Book title..."
        handleMutations={handleMutations}
        onSubmitEditing={() => {
          Keyboard.dismiss;
        }}
        onClearResults={() => {
          onClearResults('title');
        }}
      />

      <SearchParameter
        value={values.author}
        parameterType="author"
        placeholderText="Book author..."
        handleMutations={handleMutations}
        onSubmitEditing={() => {
          Keyboard.dismiss;
        }}
        onClearResults={() => {
          onClearResults('author');
        }}
      />

      <SearchParameter
        value={values.subject}
        parameterType="subject"
        placeholderText="Subject..."
        handleMutations={handleMutations}
        onSubmitEditing={() => {
          Keyboard.dismiss;
        }}
        onClearResults={() => {
          onClearResults('subject');
        }}
      />

      <SearchParameter
        value={values.isbn}
        parameterType="isbn"
        placeholderText="ISBN..."
        handleMutations={handleMutations}
        onSubmitEditing={() => {
          Keyboard.dismiss;
        }}
        onClearResults={() => {
          onClearResults('isbn');
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
