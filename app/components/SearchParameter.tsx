import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  useColorScheme,
} from 'react-native';
import {AppButtonText} from '../baseComponents/AppButtonText';

import {light, lightStyles, dark, darkStyles} from '../styles/theme';

type SearchParameterProps = {
  value: string;
  parameterType: string;
  placeholderText: string;
  handleMutations: (mutationType: string, mutation: string) => void;
  onSubmitEditing: () => void;
  onClearResults: (mutationType: string) => void;
  height?: number;
};

export const SearchParameter: React.FC<SearchParameterProps> = ({
  value,
  parameterType,
  placeholderText,
  handleMutations,
  onSubmitEditing,
  onClearResults,
  height,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const fullThemeStyles = isDarkMode ? dark : light;

  const customHeight = height ? {height: height} : null;

  return (
    <View style={[styles.searchInput, customHeight]}>
      <TextInput
        style={[styles.input, themeStyles.surface3]}
        onChangeText={text => {
          handleMutations(parameterType, text);
        }}
        value={value}
        placeholder={placeholderText}
        placeholderTextColor={fullThemeStyles.text2}
        onSubmitEditing={onSubmitEditing}
      />

      <Pressable
        style={[styles.searchInputClear, themeStyles.surface2]}
        onPress={() => {
          onClearResults(parameterType);
        }}>
        <AppButtonText>X</AppButtonText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 60,
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 8,
    padding: 10,
    fontSize: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  searchInputClear: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
