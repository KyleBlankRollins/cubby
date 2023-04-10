import {Realm} from '@realm/react';
import {Shelf} from './Shelf';

export class Cubby extends Realm.Object<Cubby> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  description!: string;
  shelves!: Realm.List<Shelf>;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Cubby',
    properties: {
      _id: 'objectId',
      userId: 'string?',
      name: 'string',
      description: 'string',
      shelves: 'Shelf[]',
    },
    primaryKey: '_id',
  };

  addShelf(realm: Realm, shelf: Shelf, isWriteFromRealm: Boolean) {
    if (!isWriteFromRealm) {
      realm.write(() => {
        this.shelves.push(shelf);
      });
    } else {
      this.shelves.push(shelf);
    }
  }
}
