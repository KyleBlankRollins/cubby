import React from 'react';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import {AddCubbyForm} from '../components/AddCubbyForm';
import {IntroText} from '../components/IntroText';
import CubbyList from '../components/CubbyList';

import {Cubby} from '../models/Cubby';
import {Section} from '../models/Section';

// import { useUser } from "@realm/react"; //TODO: Enable for Sync
import {RealmContext} from '../models';
// import {RootStackParamList} from './Types';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';

const {useRealm} = RealmContext;

type CubbyManagerProps = {
  cubbies: Realm.Results<Cubby & Realm.Object>;
  // navigationProps: NativeStackScreenProps<RootStackParamList, 'CubbyManager'>;
};

export const CubbyManager: React.FC<CubbyManagerProps> = ({
  cubbies,
  // navigationProps,
}) => {
  const realm = useRealm();

  const handleAddCubby = useCallback(
    (description: string, name: string): void => {
      if (!description || !name) {
        return;
      }

      realm.write(() => {
        const defaultSection: Section = realm.create('Section', {
          name: 'First section',
        });

        const newCubby: Cubby = realm.create('Cubby', {
          name,
          description,
        });

        newCubby.sections.push(defaultSection);

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

  return (
    <View style={styles.container}>
      {!cubbies ? (
        <IntroText />
      ) : (
        <CubbyList cubbies={cubbies} onDeleteCubby={handleDeleteCubby} />
      )}
      {/* TODO: Don't show this all the time */}
      <AddCubbyForm onSubmit={handleAddCubby} />
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
