import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Realm} from '@realm/react';

import {HorizontalRule} from '../baseComponents/HorizontalRule';

import {Cubby} from '../models/Cubby';
import {CubbyOverview} from './CubbyOverview';

type CubbyListProps = {
  cubbies: Realm.Results<Cubby & Realm.Object>;
};

const CubbyList: React.FC<CubbyListProps> = ({cubbies}) => {
  return (
    <View>
      <FlatList
        data={cubbies}
        keyExtractor={cubby => cubby._id.toString()}
        renderItem={({item}) => <CubbyOverview cubby={item} />}
        contentContainerStyle={styles.listPadding}
        ItemSeparatorComponent={HorizontalRule}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listPadding: {
    paddingBottom: 100,
  },
});

export default CubbyList;
