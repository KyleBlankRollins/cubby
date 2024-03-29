import {Realm} from '@realm/react';

export class Author extends Realm.Object<Author> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  url!: string;

  static schema = {
    name: 'Author',
    embedded: true,
    properties: {
      name: 'string',
      url: 'string',
    },
  };
}

export class ImageLinks extends Realm.Object<ImageLinks> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  smallThumbnail?: string;
  thumbnail?: string;

  static schema = {
    name: 'ImageLinks',
    embedded: true,
    properties: {
      smallThumbnail: 'string',
      thumbnail: 'string',
    },
  };
}

export class Ebook extends Realm.Object<Ebook> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  previewUrl!: string;

  static schema = {
    name: 'Ebook',
    embedded: true,
    properties: {
      previewUrl: 'string',
    },
  };
}

export class Excerpt extends Realm.Object<Excerpt> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  comment!: string;
  text!: string;

  static schema = {
    name: 'Excerpt',
    embedded: true,
    properties: {
      comment: 'string',
      text: 'string',
    },
  };
}

export class Identifier extends Realm.Object<Identifier> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  type!: string;
  identifier!: string;

  static schema = {
    name: 'Identifier',
    embedded: true,
    properties: {
      type: 'string',
      identifier: 'string',
    },
  };
}

export class Link extends Realm.Object<Link> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  url!: string;

  static schema = {
    name: 'Link',
    embedded: true,
    properties: {
      title: 'string',
      url: 'string',
    },
  };
}

export class Publisher extends Realm.Object<Publisher> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;

  static schema = {
    name: 'Publisher',
    embedded: true,
    properties: {
      name: 'string',
    },
  };
}

export class Subject extends Realm.Object<Subject> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  url!: string;

  static schema = {
    name: 'Subject',
    embedded: true,
    properties: {
      name: 'string',
      url: 'string',
    },
  };
}

export class TableOfContents extends Realm.Object<TableOfContents> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  level!: number;
  pagenumb!: string;

  static schema = {
    name: 'Table_of_contents',
    embedded: true,
    properties: {
      level: 'int',
      title: 'string',
      pagenumb: 'string',
    },
  };
}
