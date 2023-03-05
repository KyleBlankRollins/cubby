import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
} from 'react-native';

import {buttonStyles} from '../styles/button';
import colors from '../styles/colors';
import {shadows} from '../styles/shadows';

type AddCubbyFormProps = {
  onSubmit: (description: string, name: string) => void;
};

export const AddCubbyForm: React.FC<AddCubbyFormProps> = ({onSubmit}) => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(description, name);

    // Reset state
    setDescription('');
    setName('');
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputs}>
        <TextInput
          value={name}
          placeholder="Cubby name"
          placeholderTextColor={colors.darkBlue}
          onChangeText={setName}
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.textInput, styles.textInputName]}
        />
        <TextInput
          value={description}
          placeholder="Cubby description"
          placeholderTextColor={colors.darkBlue}
          onChangeText={setDescription}
          autoCorrect={false}
          autoCapitalize="none"
          style={[styles.textInput, styles.textInputDescription]}
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.submit}>
        <Text style={styles.icon}>＋</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 0.25,
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    ...shadows,
  },
  inputs: {
    flex: 1,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    borderRadius: 5,
    backgroundColor: colors.white,
    color: colors.darkBlue,
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
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 10,
    marginRight: 0,
  },
  icon: {
    ...buttonStyles.text,
  },
});
