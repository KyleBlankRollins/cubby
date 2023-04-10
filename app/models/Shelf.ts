import {Realm} from '@realm/react';
import {Book} from './Book';

// TODO: consider adding a way for shelves to have
// a previous/next relationship with other shelves.
export class Shelf extends Realm.Object<Shelf> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  _availableSpace!: number;
  name!: string;
  books!: Realm.List<Book>;
  shelfWidth!: number;
  order!: number;
  colors?: object;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Shelf',
    properties: {
      _id: 'objectId',
      _availableSpace: 'int',
      userId: 'string?',
      name: 'string',
      books: 'Book[]',
      colors: '{}',
      shelfWidth: 'int',
      order: 'int',
      assignee: {
        type: 'linkingObjects',
        objectType: 'Cubby',
        property: 'shelves',
      },
    },
    primaryKey: '_id',
  };

  setAvailableSpace() {
    let spaceTaken = 0;

    if (!this.books.length) {
      return spaceTaken;
    }

    for (let index = 0; index < this.books.length; index++) {
      const book = this.books[index];
      const bookThickness = book.pageCount
        ? Math.round(book.pageCount * 0.08)
        : 10;
      const bookWidth = Math.round((bookThickness / this.shelfWidth) * 100);

      const bookDisplayWidth = bookWidth * 10;

      spaceTaken = spaceTaken + bookDisplayWidth;
    }

    this._availableSpace = this.shelfWidth - spaceTaken;
  }

  addBook(realm: Realm, book: Book, isWriteFromRealm: Boolean) {
    if (!isWriteFromRealm) {
      realm.write(() => {
        this.books.push(book);
        this.setAvailableSpace();
      });
    } else {
      this.books.push(book);
      this.setAvailableSpace();
    }
  }
}
