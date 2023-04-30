import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  useColorScheme,
  TextInput,
} from 'react-native';

import {light, lightStyles, dark, darkStyles} from '../styles/theme';
import {AppButtonText} from '../baseComponents/AppButtonText';

type AdvancedSearchFormProps = {
  values: {
    bookTitle: string;
    author: string;
    subject: string;
    isbn: string;
  };
  handleMutations: (mutationType: string, mutation: string) => void;
  onClearResults: () => void;
};

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  values,
  handleMutations,
  onClearResults,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const fullThemeStyles = isDarkMode ? dark : light;

  const handleOnClearResults = () => {
    onClearResults();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <TextInput
          style={[styles.input, themeStyles.surface3]}
          onChangeText={text => {
            handleMutations('title', text);
          }}
          value={values.bookTitle}
          placeholder="Book title..."
          placeholderTextColor={fullThemeStyles.text2}
        />

        <Pressable
          style={[styles.searchInputClear, themeStyles.surface2]}
          onPress={() => {
            handleMutations('title', '');
            handleOnClearResults();
          }}>
          <AppButtonText>X</AppButtonText>
        </Pressable>
      </View>

      <View style={styles.searchInput}>
        <TextInput
          style={[styles.input, themeStyles.surface3]}
          onChangeText={text => {
            handleMutations('author', text);
          }}
          value={values.author}
          placeholder="Author name..."
          placeholderTextColor={fullThemeStyles.text2}
        />

        <Pressable
          style={[styles.searchInputClear, themeStyles.surface2]}
          onPress={() => {
            handleMutations('author', '');
            handleOnClearResults();
          }}>
          <AppButtonText>X</AppButtonText>
        </Pressable>
      </View>

      <View style={styles.searchInput}>
        <TextInput
          style={[styles.input, themeStyles.surface3]}
          onChangeText={text => {
            handleMutations('subject', text);
          }}
          value={values.subject}
          placeholder="Subject..."
          placeholderTextColor={fullThemeStyles.text2}
        />

        <Pressable
          style={[styles.searchInputClear, themeStyles.surface2]}
          onPress={() => {
            handleMutations('subject', '');
            handleOnClearResults();
          }}>
          <AppButtonText>X</AppButtonText>
        </Pressable>
      </View>

      <View style={styles.searchInput}>
        <TextInput
          style={[styles.input, themeStyles.surface3]}
          onChangeText={text => {
            handleMutations('isbn', text);
          }}
          value={values.isbn}
          placeholder="ISBN..."
          placeholderTextColor={fullThemeStyles.text2}
        />

        <Pressable
          style={[styles.searchInputClear, themeStyles.surface2]}
          onPress={() => {
            handleMutations('isbn', '');
            handleOnClearResults();
          }}>
          <AppButtonText>X</AppButtonText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    position: 'relative',
  },
  searchInputClear: {
    position: 'absolute',
    right: '5%',
    top: '25%',
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
