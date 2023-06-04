import React, {useState, useEffect, useMemo} from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  FlatList,
  ViewStyle,
} from 'react-native';

import {light, lightStyles, dark, darkStyles} from '../styles/theme';
import {AppText} from '../baseComponents/AppText';
import {AppButton} from '../baseComponents/AppButton';

import {Cubby} from '../models/Cubby';
import {RealmContext} from '../models';

const {useQuery} = RealmContext;

type AddBookFormProps = {
  onSubmit: (destinationCubbyId: Realm.BSON.ObjectId | undefined) => void;
  onClose: () => void;
  visible: boolean;
};

export const AddBookForm: React.FC<AddBookFormProps> = ({
  onSubmit,
  onClose,
  visible,
}) => {
  const {width, height} = useWindowDimensions();
  const [destinationCubbyId, setDestinationCubbyId] = useState<
    Realm.BSON.ObjectId | undefined
  >();
  const [selectedCubby, setSelectedCubby] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const themeStyles = isDarkMode ? darkStyles : lightStyles;
  const themeColors = isDarkMode ? dark : light;

  useEffect(() => {
    if (selectedCubby) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [selectedCubby]);

  const handleSubmit = () => {
    onSubmit(destinationCubbyId);

    // Reset state
    setReadyToSubmit(false);
    setSelectedCubby('');
  };

  const handleClose = () => {
    setReadyToSubmit(false);
    setSelectedCubby('');
    onClose();
  };

  // Get all cubbies in the realm
  const result = useQuery(Cubby);
  const cubbies = useMemo(() => result.sorted('name'), [result]);

  const cubbyTile: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    // Account for margin, padding, and constrained width.
    width: (width - 124) / 2,
    marginVertical: 6,
    marginHorizontal: 4,
    minHeight: 75,
  };
  const formStyles: ViewStyle = {
    position: 'absolute',
    width: width - 100,
    bottom: height * 0.2,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: themeColors.surface3,
  };
  const idleBorder: ViewStyle = {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: themeColors.surface4,
  };
  const activeBorder: ViewStyle = {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: themeColors.accent[300],
  };

  const renderItem = (cubbyName: string, cubbyId: Realm.BSON.ObjectId) => {
    const textColor = {
      color:
        cubbyName === selectedCubby ? themeColors.surface1 : themeColors.text1,
    };

    return (
      <Pressable
        style={[
          cubbyTile,
          cubbyName === selectedCubby
            ? themeStyles.accentSurface
            : themeStyles.surface3,
          cubbyName === selectedCubby ? activeBorder : idleBorder,
        ]}
        onPress={() => {
          setDestinationCubbyId(cubbyId);
          setSelectedCubby(cubbyName);
        }}>
        <AppText customStyle={textColor}> {cubbyName} </AppText>
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
      <View style={[formStyles, themeStyles.surface2]}>
        <View style={styles.container}>
          <AppText customStyle={styles.formText}>Add to which Cubby?</AppText>
          <FlatList
            data={cubbies}
            numColumns={2}
            keyExtractor={cubby => cubby._id.toString()}
            renderItem={({item}) => renderItem(item.name, item._id)}
          />
        </View>
        <View style={styles.buttonGroup}>
          <AppButton onPress={handleClose} title="Cancel" />
          <AppButton
            onPress={handleSubmit}
            title="Add!"
            options={{
              disabled: !readyToSubmit,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formText: {
    alignSelf: 'center',
  },
  buttonGroup: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 36,
  },
});
