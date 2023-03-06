import {Realm} from '@realm/react';
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
  subjects!: Realm.List<Subject>;
  tableOfContents!: Realm.List<TableOfContents>;
  links!: Realm.List<Link>;
  publishers!: Realm.List<Publisher>;
  authors!: Realm.List<Author>;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Book',
    properties: {
      _id: 'objectId',
      userId: 'string?',
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

  static generate(
    bookInfo: {
      url: string;
      key: string;
      title: string;
      subtitle: string;
      number_of_pages: number;
      notes: string;
      cover: object;
      subjects: Realm.List<Subject>;
      table_of_contents: Realm.List<TableOfContents>;
      links: Realm.List<Link>;
      publishers: Realm.List<Publisher>;
      authors: Realm.List<Author>;
    },
    userId?: Realm.BSON.ObjectId | undefined,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      userId: userId,
      url: bookInfo.url,
      key: bookInfo.key,
      title: bookInfo.title,
      subtitle: bookInfo.subtitle ? bookInfo.subtitle : '',
      numberOfPages: bookInfo.number_of_pages,
      cover: bookInfo.cover,
      subjects: bookInfo.subjects,
      notes: bookInfo.notes ? bookInfo.notes : '',
      tableOfContents: bookInfo.table_of_contents,
      links: bookInfo.links,
      publishers: bookInfo.publishers,
      authors: bookInfo.authors,
    };
  }
}
