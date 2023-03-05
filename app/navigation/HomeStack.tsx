import React, {useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Cubby} from '../models/Cubby';
import {CubbyManager} from '../screens/CubbyManager';
import CubbyScreen from '../screens/CubbyScreen';

import {RealmContext} from '../models';

const {useQuery} = RealmContext;
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const result = useQuery(Cubby);

  const cubbies = useMemo(() => result.sorted('name'), [result]);

  return (
    <HomeStack.Navigator initialRouteName="CubbyManager">
      <HomeStack.Screen
        name="CubbyManager"
        component={CubbyManager} // TODO: Figure out how to pass .tsx w/params component here
        options={{title: 'Welcome'}}
        initialParams={{cubbies: cubbies}}
      />
      <HomeStack.Screen
        name="CubbyScreen"
        component={CubbyScreen}
        options={{title: 'Cubby'}} // Need global stat for active cubby. Use its title here.
        initialParams={{cubby: cubbies[0]}}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
