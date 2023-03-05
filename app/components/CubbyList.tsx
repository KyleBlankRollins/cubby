import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Realm} from '@realm/react';

import {Cubby} from '../models/Cubby';
import {CubbyOverview} from './CubbyOverview';

type CubbyListProps = {
  cubbies: Realm.Results<Cubby & Realm.Object>;
  onDeleteCubby: (cubby: Cubby & Realm.Object) => void;
};

export const CubbyList: React.FC<CubbyListProps> = ({
  cubbies,
  onDeleteCubby,
}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={cubbies}
        keyExtractor={cubby => cubby._id.toString()}
        renderItem={({item}) => (
          <CubbyOverview cubby={item} onDelete={() => onDeleteCubby(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CubbyList;
