import React, {useMemo, useState} from 'react';
import {useCallback} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';

import {AddCubbyForm} from '../components/AddCubbyForm';
import {IntroText} from '../components/IntroText';
import CubbyList from '../components/CubbyList';
import {AppButton} from '../baseComponents/AppButton';

import {Cubby} from '../models/Cubby';
import {Shelf} from '../models/Shelf';

import {HomeScreenNavigationProp} from '../navigation/types';
import {RealmContext} from '../models';

const {useRealm, useQuery} = RealmContext;

export const CubbyManager: React.FC<HomeScreenNavigationProp> = () => {
  const {width} = useWindowDimensions();
  const realm = useRealm();
  const result = useQuery(Cubby);
  // TODO: Consider passing just an array to the CubbyList.
  // Possibly no need for the actual objects in the list.
  const cubbies = useMemo(() => result.sorted('name'), [result]);
  const [cubbyFormVisible, setCubbyFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);

  const handleAddCubby = useCallback(
    (description: string, name: string): void => {
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

        handleModalClose();

        return newCubby;
      });
    },
    [realm],
  );

  const handleModalClose = () => {
    setCubbyFormVisible(false);
    setOpacityLevel(1);
  };

  const handleModalOpacity = () => {
    return {
      opacity: opacityLevel,
    };
  };

  return (
    <View style={[styles.container, handleModalOpacity()]}>
      {!cubbies || !cubbies.length ? (
        <IntroText />
      ) : (
        <CubbyList cubbies={cubbies} />
      )}

      <AppButton
        onPress={() => {
          setCubbyFormVisible(true);
          setOpacityLevel(0.25);
        }}
        title="Add Cubby"
        options={{
          customStyle: styles.customButtonStyle,
          fullWidth: false,
          largeText: true,
        }}
      />

      <AddCubbyForm
        onSubmit={handleAddCubby}
        onClose={handleModalClose}
        visible={cubbyFormVisible}
      />
    </View>
  );
};
// TODO: Figure out why IntroText and CubbyList can't both be aligned the same way.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  customButtonStyle: {
    marginVertical: 30,
    width: 300,
  },
});
