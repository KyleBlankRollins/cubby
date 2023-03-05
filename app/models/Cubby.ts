import {Realm} from '@realm/react';
import {Book} from './Book';

export class Cubby extends Realm.Object<Cubby> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description!: string;
  userId!: string;
  books!: Realm.List<Book>;

  static schema = {
    name: 'Cubby',
    properties: {
      _id: 'objectId',
      owner_id: 'string',
      name: 'string',
      description: 'string',
      sections: 'Section[]',
    },
    primaryKey: '_id',
  };
}
