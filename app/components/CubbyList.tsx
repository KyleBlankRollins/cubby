import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Realm} from '@realm/react';

import colors from '../styles/colors';
import {Cubby} from '../models/Cubby';
import {CubbyOverview} from './CubbyOverview';

type CubbyListProps = {
  cubbies: Realm.Results<Cubby & Realm.Object>;
  onDeleteCubby: (cubby: Cubby & Realm.Object) => void;
};

const CubbyList: React.FC<CubbyListProps> = ({cubbies, onDeleteCubby}) => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.paragraph}>Cubby List</Text>
      <Text style={styles.paragraph}>{cubbies.length}</Text>
      <Text style={styles.paragraph}>{cubbies[0]._id.toHexString()}</Text>
      {/* PICK UP HERE: why doesn't FlatList seem to work? */}
      <FlatList
        data={cubbies}
        keyExtractor={cubby => cubby._id.toHexString()}
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
  paragraph: {
    marginVertical: 10,
    textAlign: 'center',
    color: colors.darkBlue,
    fontSize: 17,
    fontWeight: '500',
  },
});

export default CubbyList;
