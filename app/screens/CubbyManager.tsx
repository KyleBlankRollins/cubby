import React, {useMemo, useState} from 'react';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {AddCubbyForm} from '../components/AddCubbyForm';
import {IntroText} from '../components/IntroText';
import CubbyList from '../components/CubbyList';
import {AppButton} from '../components/AppButton';

import {Cubby} from '../models/Cubby';
import {Section} from '../models/Section';

import {HomeScreenNavigationProp} from '../navigation/types';
import {RealmContext} from '../models';

const {useRealm, useQuery} = RealmContext;

export const CubbyManager: React.FC<HomeScreenNavigationProp> = () => {
  const realm = useRealm();
  const result = useQuery(Cubby);
  // TODO: Consider passing just an array to the CubbyList.
  // Possibly no need for the actual objects in the list.
  const cubbies = useMemo(() => result.sorted('name'), [result]);
  const [cubbyFormVisible, setCubbyFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);

  const handleAddCubby = useCallback(
    (description: string, name: string): void => {
      if (!description || !name) {
        return;
      }

      realm.write(() => {
        const defaultSection: Section = realm.create(
          'Section',
          Section.generate('default section', {
            main: '#DDD382',
            highlight: '#D65F28',
          }),
        );

        const newCubby: Cubby = realm.create(
          'Cubby',
          Cubby.generate(name, description),
        );

        newCubby.sections.push(defaultSection);

        handleModalClose();

        return newCubby;
      });
    },
    [realm],
  );

  // TODO: Show a confirm delete modal before deleting
  const handleDeleteCubby = useCallback(
    (cubby: Cubby & Realm.Object): void => {
      realm.write(() => {
        realm.delete(cubby);
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
        <CubbyList cubbies={cubbies} onDeleteCubby={handleDeleteCubby} />
      )}
      {/* TODO: Don't show this all the time */}
      <AppButton
        onPress={() => {
          setCubbyFormVisible(true);
          setOpacityLevel(0.25);
        }}
        title="Add Cubby"
      />
      <AddCubbyForm
        onSubmit={handleAddCubby}
        onClose={handleModalClose}
        visible={cubbyFormVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 8,
  },
});
