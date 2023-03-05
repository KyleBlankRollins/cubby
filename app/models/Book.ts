import {Realm} from '@realm/react';
import {Cubby} from './Cubby';
import {
  Author,
  Link,
  Publisher,
  Subject,
  TableOfContents,
} from './EmbeddedObjects';

export class Book extends Realm.Object<Book> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  url!: string;
  key!: string;
  title!: string;
  subtitle!: string;
  numberOfPages!: number;
  notes!: string;
  cover!: object;
  // publishDate!: date;
  // identifiers!: object;
  subjects!: Realm.List<Subject>;
  tableOfContents!: Realm.List<TableOfContents>;
  link!: Realm.List<Link>;
  publisher!: Realm.List<Publisher>;
  authors!: Realm.List<Author>;
  userId!: string;
  assignee!: {
    type: 'linkingObjects';
    objectType: Cubby;
    property: 'books';
  };

  static schema = {
    name: 'Book',
    properties: {
      _id: 'objectId',
      userId: 'string',
      url: 'string',
      key: 'string',
      title: 'string',
      subtitle: 'string?',
      numberOfPages: 'int',
      cover: '{}',
      subjects: {type: 'list', objectType: 'Subject'},
      notes: 'string?',
      tableOfContents: {type: 'list', objectType: 'Table_of_contents'},
      links: {type: 'list', objectType: 'Link'},
      publishers: {type: 'list', objectType: 'Publisher'},
      // publishDate: "date",
      // identifiers: "{}",
      authors: {type: 'list', objectType: 'Author'},
      assignee: {
        type: 'linkingObjects',
        objectType: 'Section',
        property: 'books',
      },
    },
    primaryKey: '_id',
  };
}
