import {Realm} from '@realm/react';
import {Section} from './Section';

export class Cubby extends Realm.Object<Cubby> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description!: string;
  sections!: Realm.List<Section>;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Cubby',
    properties: {
      _id: 'objectId',
      userId: 'string?',
      name: 'string',
      description: 'string',
      sections: 'Section[]',
    },
    primaryKey: '_id',
  };

  static generate(
    name: string,
    description: string,
    userId?: Realm.BSON.ObjectId | undefined,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      description,
      sections: [],
      userId,
    };
  }
}
