import {Realm} from '@realm/react';
import {ImageLinks, Identifier} from './EmbeddedObjects';

export class Book extends Realm.Object<Book> {
  _id!: string;
  title!: string;
  authors!: string[];
  publisher!: string;
  description!: string;
  infoLink!: string;
  industryIdentifiers?: Realm.List<Identifier>;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  language?: string;
  publishedDate?: string;
  cover?: ImageLinks;
  userId?: Realm.BSON.ObjectId;

  static schema = {
    name: 'Book',
    properties: {
      _id: 'string',
      title: 'string',
      authors: 'string[]',
      publisher: 'string',
      description: 'string',
      infoLink: 'string',
      industryIdentifiers: {
        type: 'list',
        objectType: 'Identifier',
      },
      pageCount: 'int?',
      printType: 'string?',
      categories: 'string[]',
      averageRating: 'int?',
      ratingsCount: 'int?',
      maturityRating: 'string?',
      language: 'string?',
      publishedDate: 'string?',
      cover: 'ImageLinks?',
      userId: 'string?',
      assignee: {
        type: 'linkingObjects',
        objectType: 'Section',
        property: 'books',
      },
    },
    primaryKey: '_id',
  };

  // static generate(
  //   bookInfo: {
  //     id: string;
  //     authors: Realm.List<Author>;
  //     cover?: Cover;
  //     ebooks?: Realm.List<Ebook>;
  //     excerpts?: Realm.List<Excerpt>;
  //     identifiers: Realm.List<Identifier>;
  //     key: string;
  //     links?: Realm.List<Link>;
  //     number_of_pages: number;
  //     notes?: string;
  //     publishDate: string;
  //     publishers: Realm.List<Publisher>;
  //     subjects?: Realm.List<Subject>;
  //     subtitle?: string;
  //     table_of_contents?: Realm.List<TableOfContents>;
  //     title: string;
  //     url: string;
  //   },
  //   userId?: Realm.BSON.ObjectId | undefined,
  // ) {
  //   return {
  //     _id: bookInfo.id,
  //     authors: bookInfo.authors,
  //     cover: bookInfo.cover,
  //     ebooks: bookInfo.ebooks,
  //     excerpts: bookInfo.excerpts,
  //     identifiers: bookInfo.identifiers,
  //     key: bookInfo.key,
  //     links: bookInfo.links,
  //     numberOfPages: bookInfo.number_of_pages,
  //     notes: bookInfo.notes,
  //     publishDate: bookInfo.publishDate,
  //     publishers: bookInfo.publishers,
  //     subjects: bookInfo.subjects,
  //     subtitle: bookInfo.subtitle,
  //     tableOfContents: bookInfo.table_of_contents,
  //     title: bookInfo.title,
  //     url: bookInfo.url,
  //     userId: userId,
  //   };
  // }
}
