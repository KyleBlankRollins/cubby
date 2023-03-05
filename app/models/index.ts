import {createRealmContext} from '@realm/react';
import {Book} from './Book';
import {Cubby} from './Cubby';
import {Section} from './Section';
import {
  Author,
  Link,
  Publisher,
  Subject,
  TableOfContents,
} from './EmbeddedObjects';

export const RealmContext = createRealmContext({
  schema: [
    Book,
    Cubby,
    Section,
    Author,
    Link,
    Publisher,
    Subject,
    TableOfContents,
  ],
});
