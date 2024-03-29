import {Realm} from '@realm/react';
import {ImageLinks, Identifier} from './EmbeddedObjects';

export class Book extends Realm.Object<Book> {
  _id!: string;
  title!: string;
  authors!: string[];
  publisher!: string;
  description!: string;
  infoLink!: string;
  displayWidth!: number;
  displayHeight!: number;
  subtitle?: string;
  industryIdentifiers?: Realm.List<Identifier>;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  language?: string;
  publishedDate?: string;
  imageLinks?: ImageLinks;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Book',
    properties: {
      _id: 'string',
      title: 'string',
      subtitle: 'string?',
      authors: 'string[]',
      publisher: 'string',
      description: 'string?',
      infoLink: 'string',
      displayWidth: 'int',
      displayHeight: 'int',
      industryIdentifiers: {
        type: 'list',
        objectType: 'Identifier',
        default: [],
      },
      pageCount: 'int?',
      printType: 'string?',
      categories: {
        type: 'list',
        objectType: 'string',
        default: [],
      },
      averageRating: 'int?',
      ratingsCount: 'int?',
      maturityRating: 'string?',
      language: 'string?',
      publishedDate: 'string?',
      imageLinks: 'ImageLinks?',
      userId: 'string?',
      assignee: {
        type: 'linkingObjects',
        objectType: 'Shelf',
        property: 'books',
      },
    },
    primaryKey: '_id',
  };
}
