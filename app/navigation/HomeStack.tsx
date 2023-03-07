import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CubbyManager} from '../screens/CubbyManager';
import CubbyScreen from '../screens/CubbyScreen';

import {HomeStackNavigatorParamList} from './types';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="CubbyManager">
      <HomeStack.Screen
        name="CubbyManager"
        component={CubbyManager} // TODO: Figure out why TS is mad here
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="CubbyScreen"
        component={CubbyScreen} // TODO: Figure out why TS is mad
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
