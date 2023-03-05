import {Cubby} from './models/Cubby';

export type RootStackParamList = {
  CubbyManager: {
    cubbies: Realm.Results<Cubby & Realm.Object>;
    userId?: string;
  };
  // TODO: Define types for each route's parameters.
  // Examples: https://reactnavigation.org/docs/typescript/
};
