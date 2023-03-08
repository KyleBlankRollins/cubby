import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import {Cubby} from '../models/Cubby';

export type HomeStackNavigatorParamList = {
  CubbyManager: {
    cubbies: Realm.Results<Cubby & Realm.Object>;
  };
  CubbyScreen: {
    _id: string;
    name: string;
  };
  AddCubbyModal: {};
};

export type BottomTabNavigatorParamList = {
  Home: HomeStackNavigatorParamList;
  'Find a book': undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyScreen' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

export type CubbyScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyManager' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

export type BookScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'CubbyManager' // All route possibilities for CubbyManager. Undefined means access to all routes.
>;

// export type HomeScreenRouteProp = RouteProp<
//   HomeStackNavigatorParamList,
//   'CubbyManager'
// >;

export type CubbyScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'CubbyScreen'
>;
