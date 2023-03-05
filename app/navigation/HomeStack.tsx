import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Cubby} from '../models/Cubby';
import {CubbyManager} from '../screens/CubbyManager';
import CubbyScreen from '../screens/CubbyScreen';

import {RealmContext} from '../models';
import {HomeStackNavigatorParamList} from './types';

const {useQuery} = RealmContext;
const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  const result = useQuery(Cubby);
  const cubbies = useMemo(() => result.sorted('name'), [result]);
  let defaultCubby: Realm.BSON.ObjectId;

  if (cubbies && cubbies.length) {
    defaultCubby = cubbies[0]._id;
  }

  return (
    <HomeStack.Navigator initialRouteName="CubbyManager">
      <HomeStack.Screen
        name="CubbyManager"
        component={CubbyManager} // TODO: Figure out why TS is mad here
        options={{title: 'Welcome'}}
        initialParams={{cubbies: cubbies}}
      />
      <HomeStack.Screen
        name="CubbyScreen"
        component={CubbyScreen}
        options={{title: 'Cubby'}} // TODO: Need global stat for active cubby. Use its title here.
        initialParams={{_id: defaultCubby}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
