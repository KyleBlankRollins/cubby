import React from 'react';
import {StyleSheet, View, Pressable, TextInput} from 'react-native';
import {AppButtonText} from '../baseComponents/AppButtonText';

type SearchParameterProps = {
  setQuery: () => void;
  parameterType: string;
  placeholderText: string;
};
// PICK UP HERE: Abstract parameter inputs into this component.
export const SearchParameter = React.memo<AppButtonProps>(
  ({onPress, title, bgColor, fullWidth}) => {
    return (
      <View>
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
    );
  },
);

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  appButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  fullWidth: {
    margin: 0,
  },
  fitWidth: {
    marginHorizontal: 2,
    marginVertical: 1,
  },
});
