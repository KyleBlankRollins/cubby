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
        component={CubbyScreen} // TODO: Figure out why TS is mad
        options={{title: 'Cubby'}} // TODO: Need global state for active cubby. Use its title here.
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
