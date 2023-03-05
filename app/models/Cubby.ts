import {Realm} from '@realm/react';
import {Section} from './Section';

export class Cubby extends Realm.Object<Cubby> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description!: string;
  // userId!: string;
  sections!: Realm.List<Section>;

  static schema = {
    name: 'Cubby',
    properties: {
      _id: 'objectId',
      // userId: 'string',
      name: 'string',
      description: 'string',
      sections: 'Section[]',
    },
    primaryKey: '_id',
  };
}
