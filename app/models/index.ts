import {createRealmContext} from '@realm/react';
import {Book} from './Book';
import {Cubby} from './Cubby';
import {Section} from './Section';
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

export const RealmContext = createRealmContext({
  schema: [
    Book,
    Cubby,
    Section,
    Author,
    Cover,
    Ebook,
    Excerpt,
    Identifier,
    Link,
    Publisher,
    Subject,
    TableOfContents,
  ],
});
