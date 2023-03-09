import {Realm} from '@realm/react';
import {
  Author,
  Cover,
  Ebook,
  Excerpt,
  Identifier,
  Link,
  Publisher,
  Subject,
  TableOfContents,
} from './EmbeddedObjects';

export class Book extends Realm.Object<Book> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  authors!: Realm.List<Author>;
  cover?: Cover;
  ebooks?: Realm.List<Ebook>;
  excerpts?: Realm.List<Excerpt>;
  identifiers!: Realm.List<Identifier>;
  key!: string;
  links?: Realm.List<Link>;
  numberOfPages!: number;
  notes?: string;
  publishDate?: string;
  publishers!: Realm.List<Publisher>;
  subjects?: Realm.List<Subject>;
  subtitle?: string;
  tableOfContents?: Realm.List<TableOfContents>;
  title!: string;
  url!: string;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Book',
    properties: {
      _id: 'objectId',
      authors: {type: 'list', objectType: 'Author'},
      cover: 'Cover?',
      ebooks: {type: 'list', objectType: 'Ebook'},
      excerpts: {type: 'list', objectType: 'Excerpt'},
      identifiers: {type: 'list', objectType: 'Identifier'},
      key: 'string',
      links: {type: 'list', objectType: 'Link'},
      numberOfPages: 'int',
      notes: 'string?',
      publishDate: 'string',
      publishers: {type: 'list', objectType: 'Publisher'},
      subjects: {type: 'list', objectType: 'Subject'},
      subtitle: 'string?',
      tableOfContents: {type: 'list', objectType: 'Table_of_contents'},
      title: 'string',
      url: 'string',
      userId: 'string?',
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
      authors: Realm.List<Author>;
      cover?: Cover;
      ebooks?: Realm.List<Ebook>;
      excerpts?: Realm.List<Excerpt>;
      identifiers: Realm.List<Identifier>;
      key: string;
      links?: Realm.List<Link>;
      number_of_pages: number;
      notes?: string;
      publishDate: string;
      publishers: Realm.List<Publisher>;
      subjects?: Realm.List<Subject>;
      subtitle?: string;
      table_of_contents?: Realm.List<TableOfContents>;
      title: string;
      url: string;
    },
    userId?: Realm.BSON.ObjectId | undefined,
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      authors: bookInfo.authors,
      cover: bookInfo.cover,
      ebooks: bookInfo.ebooks,
      excerpts: bookInfo.excerpts,
      identifiers: bookInfo.identifiers,
      key: bookInfo.key,
      links: bookInfo.links,
      numberOfPages: bookInfo.number_of_pages,
      notes: bookInfo.notes,
      publishDate: bookInfo.publishDate,
      publishers: bookInfo.publishers,
      subjects: bookInfo.subjects,
      subtitle: bookInfo.subtitle,
      tableOfContents: bookInfo.table_of_contents,
      title: bookInfo.title,
      url: bookInfo.url,
      userId: userId,
    };
  }
}
