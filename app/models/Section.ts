import {Realm} from '@realm/react';
import {Book} from './Book';

export class Section extends Realm.Object<Section> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  books!: Realm.List<Book>;
  colors!: object;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Section',
    properties: {
      _id: 'objectId',
      userId: 'string?',
      name: 'string',
      books: 'Book[]',
      colors: '{}',
      assignee: {
        type: 'linkingObjects',
        objectType: 'Cubby',
        property: 'sections',
      },
    },
    primaryKey: '_id',
  };

  static generate(
    name: string,
    colors: {
      main: string;
      highlight: string;
    },
    userId?: Realm.BSON.ObjectId | undefined,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      colors,
      userId,
    };
  }
}
