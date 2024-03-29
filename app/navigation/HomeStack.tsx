import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CubbyManager} from '../screens/CubbyManager';
import CubbyScreen from '../screens/CubbyScreen';

import {HomeStackNavigatorParamList} from './types';
import {AddCubbyForm} from '../components/AddCubbyForm';
import {AddBookForm} from '../components/AddBookForm';
import {BookScreen} from '../screens/BookScreen';
import {SearchResultsList} from '../components/SearchResultsList';

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
        name="BookScreen"
        component={BookScreen} // TODO: Figure out why TS is mad
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="SearchResultsScreen"
        component={SearchResultsList} // TODO: Figure out why TS is mad
        options={() => ({
          title: 'Search results',
        })}
      />
      <HomeStack.Screen
        name="AddCubbyScreen"
        component={AddCubbyForm} // TODO: Figure out why TS is mad
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="AddBookModal"
        component={AddBookForm} // TODO: Figure out why TS is mad
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
