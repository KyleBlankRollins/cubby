import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {buttonStyles} from '../styles/button';
import {lightStyles, darkStyles} from '../styles/theme';
// import {shadows} from '../styles/shadows';

type AddCubbyFormProps = {
  onSubmit: (description: string, name: string) => void;
  onClose: () => void;
  visible: boolean;
};

export const AddCubbyForm: React.FC<AddCubbyFormProps> = ({
  onSubmit,
  onClose,
  visible,
}) => {
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
            <Text style={styles.icon}>＋</Text>
          </Pressable>
          <Pressable onPress={handleClose} style={styles.submit}>
            <Text style={styles.icon}>X</Text>
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
  icon: {
    ...buttonStyles.text,
  },
  verticalButtonGroup: {
    justifyContent: 'center',
    // marginVertical: 8,
  },
});
