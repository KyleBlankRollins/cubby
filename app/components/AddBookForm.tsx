import React, {useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {buttonStyles} from '../styles/button';
import {lightStyles, darkStyles} from '../styles/theme';
import {AppText} from '../baseComponents/AppText';

import {bookAPIRaw} from '../models/bookAPIRaw';

type AddBookFormProps = {
  bookInfo: bookAPIRaw;
  onSubmit: (description: string, name: string) => void;
  onClose: () => void;
  visible: boolean;
};
// PICK UP HERE: Finish add book flow
export const AddBookForm: React.FC<AddBookFormProps> = ({
  onSubmit,
  onClose,
  visible,
  bookInfo,
}) => {
  // TODO: Change this to add dropdown or tap selection for destination cubby.
  // Ignore sections for now. Put all books in the default section.
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const handleSubmit = () => {
    onSubmit(description, name);

    // Reset state
    setDescription('');
    setName('');
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
        <View style={styles.inputs}>
          <TextInput
            value={name}
            placeholder="Cubby name"
            // placeholderTextColor={colors.darkBlue}
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize="none"
            style={[
              styles.textInput,
              styles.textInputName,
              themeStyles.surface3,
            ]}
          />
          <TextInput
            value={description}
            placeholder="Cubby description"
            // placeholderTextColor={colors.darkBlue}
            onChangeText={setDescription}
            autoCorrect={false}
            autoCapitalize="none"
            style={[
              styles.textInput,
              styles.textInputDescription,
              themeStyles.surface3,
            ]}
          />
        </View>
        <View style={styles.verticalButtonGroup}>
          <Pressable onPress={handleSubmit} style={styles.submit}>
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
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: '40%',
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 4,
    // ...shadows,
  },
  inputs: {
    flex: 1,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    borderRadius: 5,
    fontSize: 17,
  },
  textInputName: {
    flex: 1,
    marginBottom: 10,
  },
  textInputDescription: {
    flex: 2,
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
