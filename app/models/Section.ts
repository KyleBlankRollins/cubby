import {Realm} from '@realm/react';
import {Book} from './Book';
import {Cubby} from './Cubby';

export class Section extends Realm.Object<Section> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  // userId!: string;
  name!: string;
  books!: Realm.List<Book>;
  colors!: object;
  assignee!: {
    type: 'linkingObjects';
    objectType: Cubby;
    property: 'sections';
  };

  static schema = {
    name: 'Section',
    properties: {
      _id: 'objectId',
      // userId: 'string',
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
}
