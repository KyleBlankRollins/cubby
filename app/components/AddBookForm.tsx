import React, {useState, useMemo} from 'react';
import {
  Modal,
  View,
  TextInput,
  Pressable,
  Platform,
  StyleSheet,
  useColorScheme,
  FlatList,
} from 'react-native';

import {buttonStyles} from '../styles/button';
import {lightStyles, darkStyles} from '../styles/theme';
import {AppText} from '../baseComponents/AppText';

import {Cubby} from '../models/Cubby';
import {Book} from '../models/Book';
import {BookMap} from '../models/gBookApiRaw';
import {RealmContext} from '../models';

const {useQuery} = RealmContext;

type AddBookFormProps = {
  bookInfo: Book | BookMap;
  onSubmit: (destinationCubbyId: Realm.BSON.ObjectId) => void;
  onClose: () => void;
  visible: boolean;
};

export const AddBookForm: React.FC<AddBookFormProps> = ({
  onSubmit,
  onClose,
  visible,
  bookInfo,
}) => {
  // TODO: Change this to add dropdown or tap selection for destination cubby.
  // Ignore shelves for now. Put all books in the default shelf.
  const [destinationCubby, setDestinationCubby] = useState('No Cubby selected');
  const [destinationCubbyId, setDestinationCubbyId] = useState<
    Realm.BSON.ObjectId | undefined
  >();

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const handleSubmit = () => {
    onSubmit(destinationCubbyId);

    // Reset state
    setDestinationCubby('');
  };

  const handleClose = () => {
    onClose();
  };

  // Get all cubbies in the realm
  const result = useQuery(Cubby);
  const cubbies = useMemo(() => result.sorted('name'), [result]);

  const renderItem = (cubbyName: string, cubbyId: Realm.BSON.ObjectId) => {
    return (
      <Pressable
        style={[styles.cubbySelector, themeStyles.surface3]}
        onPress={() => {
          setDestinationCubby(cubbyName);
          setDestinationCubbyId(cubbyId);
        }}>
        <AppText> {cubbyName} </AppText>
      </Pressable>
    );
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
          <AppText>{destinationCubby}</AppText>
          <AppText>Add to which Cubby?</AppText>
          <FlatList
            data={cubbies}
            keyExtractor={cubby => cubby._id.toString()}
            renderItem={({item}) => renderItem(item.name, item._id)}
          />
        </View>
        {/* <View style={styles.inputs}>
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
         */}
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
    height: 250,
    width: '100%',
    position: 'absolute',
    bottom: '40%',
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 4,
    // ...shadows,
  },
  container: {
    flex: 1,
  },
  cubbySelector: {
    borderWidth: 2,
    borderColor: 'red',
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
