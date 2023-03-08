import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Realm} from '@realm/react';

import {Cubby} from '../models/Cubby';
import {CubbyOverview} from './CubbyOverview';

type CubbyListProps = {
  cubbies: Realm.Results<Cubby & Realm.Object>;
  onDeleteCubby: (cubby: Cubby & Realm.Object) => void;
};

const CubbyList: React.FC<CubbyListProps> = ({cubbies, onDeleteCubby}) => {
  // Note: Hack to work around FlatList not currently
  // accepting Realm.Results. https://github.com/facebook/react-native/commit/d574ea3526e713eae2c6e20c7a68fa66ff4ad7d2
  const FlatListArray = Array.from(cubbies);

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={FlatListArray}
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
    // flex: 1,
    // height: 300,
    // backgroundColor: '#fff',
    // marginHorizontal: 20,
    // justifyContent: 'center',
  },
});

export default CubbyList;
