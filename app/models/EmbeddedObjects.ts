import {Realm} from '@realm/react';

class Author extends Realm.Object<Author> {
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

class Link extends Realm.Object<Link> {
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

class Publisher extends Realm.Object<Publisher> {
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

class Subject extends Realm.Object<Subject> {
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

class TableOfContents extends Realm.Object<TableOfContents> {
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

export {Author, Link, Publisher, Subject, TableOfContents};
