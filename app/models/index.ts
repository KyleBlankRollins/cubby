import {createRealmContext} from '@realm/react';
import {Book} from './Book';
import {Cubby} from './Cubby';
import {Section} from './Section';
import {ImageLinks, Identifier} from './EmbeddedObjects';

export const RealmContext = createRealmContext({
  schema: [Book, Cubby, Section, ImageLinks, Identifier],
});
