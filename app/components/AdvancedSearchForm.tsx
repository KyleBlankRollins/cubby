import React, {useState} from 'react';
import {
  Modal,
  View,
  Pressable,
  Platform,
  StyleSheet,
  useColorScheme,
  TextInput,
} from 'react-native';

import {buttonStyles} from '../styles/button';
import {light, lightStyles, dark, darkStyles} from '../styles/theme';
import {AppText} from '../baseComponents/AppText';

type AdvancedSearchFormProps = {
  onSubmit: (
    bookTitle?: string,
    authorName?: string,
    subject?: string,
    isbn?: string,
  ) => void;
  onClose: () => void;
  visible: boolean;
};

export const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  onSubmit,
  onClose,
  visible,
}) => {
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [subject, setSubject] = useState('');
  const [isbn, setIsbn] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const fullThemeStyles = isDarkMode ? dark : light;

  const handleSubmit = () => {
    onSubmit(bookTitle, authorName, subject, isbn);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={'fade'}
      onRequestClose={() => {
        handleClose();
      }}>
      <View style={[styles.form, themeStyles.surface2]}>
        <View style={styles.container}>
          <TextInput
            onChangeText={setBookTitle}
            value={bookTitle}
            placeholder="Book title..."
            placeholderTextColor={fullThemeStyles.text2}
            style={[styles.textInput, themeStyles.surface3]}
          />
          <TextInput
            onChangeText={setAuthorName}
            value={authorName}
            placeholder="Author name..."
            placeholderTextColor={fullThemeStyles.text2}
            style={[styles.textInput, themeStyles.surface3]}
          />
          <TextInput
            onChangeText={setSubject}
            value={subject}
            placeholder="Subject..."
            placeholderTextColor={fullThemeStyles.text2}
            style={[styles.textInput, themeStyles.surface3]}
          />
          <TextInput
            onChangeText={setIsbn}
            value={isbn}
            placeholder="ISBN..."
            placeholderTextColor={fullThemeStyles.text2}
            style={[styles.textInput, themeStyles.surface3]}
          />
        </View>

        <View style={styles.verticalButtonGroup}>
          <Pressable onPress={handleSubmit} style={styles.submit}>
            {/* TODO: make this more appropriate */}
            <AppText>＋</AppText>
          </Pressable>
          <Pressable onPress={handleClose} style={styles.submit}>
            <AppText>X</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    height: 400,
    width: '100%',
    position: 'absolute',
    bottom: '30%',
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 4,
    // ...shadows,
  },
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    borderRadius: 5,
    fontSize: 17,
    marginVertical: 5,
  },
  submit: {
    ...buttonStyles.button,
    width: 50,
    height: '50%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 2,
    marginLeft: 10,
    marginRight: 0,
  },
  verticalButtonGroup: {
    justifyContent: 'center',
    // marginVertical: 8,
  },
});
