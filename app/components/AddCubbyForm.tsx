import React, {useState, useCallback} from 'react';
import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {light, lightStyles, dark, darkStyles} from '../styles/theme';
import {AppButton} from '../baseComponents/AppButton';
import {AppButtonText} from '../baseComponents/AppButtonText';

import {Cubby} from '../models/Cubby';
import {Shelf} from '../models/Shelf';
import {HomeScreenNavigationProp} from '../navigation/types';
import {RealmContext} from '../models';

const {useRealm} = RealmContext;

export const AddCubbyForm: React.FC = () => {
  const realm = useRealm();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {width} = useWindowDimensions();

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const fullThemeStyles = isDarkMode ? dark : light;

  const handleAddCubby = useCallback(() => {
    // TODO: Add alert about needing these.
    if (!description || !name) {
      return;
    }

    realm.write(() => {
      const defaultShelf: Shelf = realm.create(Shelf, {
        _id: new Realm.BSON.ObjectID(),
        _availableSpace: width,
        name: 'Shelf 0',
        books: [],
        shelfWidth: width,
        order: 0,
      });

      const newCubby: Cubby = realm.create(Cubby, {
        _id: new Realm.BSON.ObjectID(),
        name,
        description,
      });

      newCubby.shelves.push(defaultShelf);

      // TODO: Figure out how I messed up the navigation types
      navigation.navigate('CubbyManager');
    });
  }, [realm, width, description, name, navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.listStyle}>
        <View style={styles.textInput}>
          <TextInput
            style={[styles.input, themeStyles.surface3]}
            onChangeText={text => {
              setName(text);

              if (name && description) {
                setReadyToSubmit(true);
              }
            }}
            multiline={true}
            value={name}
            placeholder="Cubby name..."
            placeholderTextColor={fullThemeStyles.text2}
          />

          <Pressable
            style={[styles.textInputClear, themeStyles.surface2]}
            onPress={() => {
              setName('');
            }}>
            <AppButtonText>X</AppButtonText>
          </Pressable>
        </View>

        <View style={[styles.textInput, styles.descriptionInput]}>
          <TextInput
            style={[styles.input, themeStyles.surface3]}
            onChangeText={text => {
              setDescription(text);

              if (name && description) {
                setReadyToSubmit(true);
              }
            }}
            multiline={true}
            value={description}
            placeholder="Cubby description..."
            placeholderTextColor={fullThemeStyles.text2}
          />

          <Pressable
            style={[styles.textInputClear, themeStyles.surface2]}
            onPress={() => {
              setDescription('');
            }}>
            <AppButtonText>X</AppButtonText>
          </Pressable>
        </View>

        <View style={styles.buttonGroup}>
          <AppButton
            onPress={() => {
              // TODO: Figure out how I messed up the navigation types
              navigation.navigate('CubbyManager');
            }}
            title="Cancel"
          />
          <AppButton
            onPress={handleAddCubby}
            title="Add!"
            options={{
              disabled: !readyToSubmit,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  formContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  listStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 'auto',
  },
  textInput: {
    height: 60,
    flexDirection: 'row',
    position: 'relative',
    marginVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  descriptionInput: {
    height: 120,
  },
  input: {
    flex: 8,
    padding: 10,
    fontSize: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textInputClear: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonGroup: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
});
