import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CubbyManager} from '../screens/CubbyManager';
import CubbyScreen from '../screens/CubbyScreen';

import {HomeStackNavigatorParamList} from './types';
import {AddCubbyForm} from '../components/AddCubbyForm';

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
      <HomeStack.Screen
        name="AddCubbyModal"
        component={AddCubbyForm} // TODO: Figure out why TS is mad
        options={{
          presentation: 'modal',
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
            opacity: 0.99,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
