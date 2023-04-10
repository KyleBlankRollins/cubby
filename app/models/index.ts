import {createRealmContext} from '@realm/react';
import {Book} from './Book';
import {Cubby} from './Cubby';
import {Shelf} from './Shelf';
import {ImageLinks, Identifier} from './EmbeddedObjects';

export const RealmContext = createRealmContext({
  schema: [Book, Cubby, Shelf, ImageLinks, Identifier],
});
