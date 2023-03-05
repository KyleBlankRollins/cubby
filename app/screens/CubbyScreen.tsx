import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {CubbyScreenNavigationProp} from '../navigation/types';
import {CubbyScreenRouteProp} from '../navigation/types';
import {Cubby} from '../models/Cubby';

export const CubbyScreen: React.FC<CubbyScreenNavigationProp> = () => {
  const route = useRoute<CubbyScreenRouteProp>();
  const {_id} = route.params;

  // query for cubby based on ID

  return (
    <View style={{flex: 1, paddingTop: 12, paddingHorizontal: 10}}>
      <Text style={{fontSize: 18, paddingBottom: 12}}>Name: {name}</Text>
      <Text style={{fontSize: 18}}>books: {sections.length}</Text>
    </View>
  );
};

export default CubbyScreen;
