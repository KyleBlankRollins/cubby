import { Realm } from '@realm/react';

class Author extends Realm.Object<Author> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  url!: string;

  static embedded: boolean = true;

  constructor(realm: Realm, name: string, url: string) {
    super(realm, { name, url });
  }
}

class Link extends Realm.Object<Link> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  url!: string;

  static embedded: boolean = true;

  constructor(realm: Realm, title: string, url: string) {
    super(realm, { title, url });
  }
}

class Publisher extends Realm.Object<Publisher> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;

  static embedded: boolean = true;

  constructor(realm: Realm, name: string) {
    super(realm, { name });
  }
}

class Subject extends Realm.Object<Subject> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  url!: string;

  static embedded: boolean = true;

  constructor(realm: Realm, name: string, url: string) {
    super(realm, { name, url });
  }
}

class TableOfContents extends Realm.Object<TableOfContents> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  level!: number;
  pagenumb!: string;

  static embedded: boolean = true;

  constructor(realm: Realm, title: string, level: number, pagenumb: string) {
    super(realm, { title, level, pagenumb });
  }
}

export {
  Author,
  Link,
  Publisher,
  Subject,
  TableOfContents
};