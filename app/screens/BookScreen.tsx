import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {BookScreenNavigationProp} from '../navigation/types';
import {BookScreenRouteProp} from '../navigation/types';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {AddBookForm} from '../components/AddBookForm';

import {Book} from '../models/Book';
import {Section} from '../models/Section';
import {Cubby} from '../models/Cubby';
import {RealmContext} from '../models';
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
} from '../models/EmbeddedObjects';

const {useRealm, useQuery} = RealmContext;

export const BookScreen: React.FC<BookScreenNavigationProp> = () => {
  // const [isInRealm, setIsInRealm] = useState(false);
  const [bookFormVisible, setBookFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);

  const route = useRoute<BookScreenRouteProp>();
  const {book} = route.params;

  // const id = JSON.parse(props.bookId);
  const realm = useRealm();
  const realmBook: Realm.Results<Book> = useQuery(Book).filtered(
    `title == "${book.title}"`,
  );
  // const book = result.filtered(`_id == oid(${id})`)[0];

  // TODO: Check if book is already in the realm, which means it's in a cubby. Show that info.

  const handleModalClose = () => {
    setBookFormVisible(false);
    setOpacityLevel(1);
  };

  const handleModalOpacity = () => {
    return {
      opacity: opacityLevel,
    };
  };

  const handleAddBook = useCallback(
    (destinationCubbyId: Realm.BSON.ObjectId): void => {
      // TODO: Add alert about needing a destination cubby.
      if (!destinationCubbyId) {
        return;
      }

      const constructedBook = {
        authors: [],
        cover: {},
        ebooks: [],
        // PICK UP HERE: finish creating embedded objects
        // think about how to streamline this.
        // after constructedBook is complete, can pass to
        // `realm.create('Book')`.
        excerpts: [],
        identifiers: [],
        key: book.key,
        links: [],
        numberOfPages: book.number_of_pages,
        notes: book.notes,
        publishDate: book.publishDate,
        publishers: [],
        subjects: [],
        subtitle: book.subtitle,
        tableOfContents: [],
        title: book.title,
        url: book.url,
      };

      // iterate authors and create new Author Realm objects
      for (let index = 0; index < book.authors.length; index++) {
        const newAuthor: Author = realm.create('Author', {
          name: book.authors[index].name,
          url: book.authors[index].url,
        });

        constructedBook.authors.push(newAuthor);
      }

      // if cover object exists, create new Cover Realm object
      if (book.cover) {
        const newCover: Cover = realm.create('Cover', {
          large: book.cover.large,
          medium: book.cover.medium,
          small: book.cover.small,
        });

        constructedBook.cover = newCover;
      }

      // iterate ebooks and create new Ebook Realm objects
      if (book.ebooks && book.ebooks.length) {
        for (let index = 0; index < book.ebooks.length; index++) {
          const newEbook: Ebook = realm.create('Ebook', {
            previewUrl: book.ebooks[index].preview_url,
          });

          constructedBook.ebooks.push(newEbook);
        }
      }

      // iterate excerpts and create new Excerpt Realm objects
      if (book.excerpts && book.excerpts.length) {
        for (let index = 0; index < book.excerpts.length; index++) {
          const newExcerpt: Excerpt = realm.create('Excerpt', {
            comment: book.excerpts[index].comment,
            text: book.excerpts[index].text,
          });

          constructedBook.excerpts.push(newExcerpt);
        }
      }

      // iterate identifiers and create new Identifier Realm objects
      if (book.identifiers) {
        for (
          let index = 0;
          index < Object.keys(book.identifiers).length;
          index++
        ) {
          const newIdentifier: Identifier = realm.create('Identifier', {
            identifierType: Object.keys(book.identifiers)[index],
            identifierValue: Object.keys(book.identifiers)[index][0],
          });

          constructedBook.identifiers.push(newIdentifier);
        }
      }

      // iterate links and create new Link Realm objects
      if (book.links && book.links.length) {
        for (let index = 0; index < book.links.length; index++) {
          const newLink: Link = realm.create('Link', {
            url: book.links[index].url,
            title: book.links[index].title,
          });

          constructedBook.links.push(newLink);
        }
      }

      // iterate publishers and create new Publisher Realm objects
      if (book.publishers && book.publishers.length) {
        for (let index = 0; index < book.publishers.length; index++) {
          const newPublisher: Publisher = realm.create('Publisher', {
            name: book.publishers[index].name,
          });

          constructedBook.publishers.push(newPublisher);
        }
      }

      // iterate subjects and create new Subject Realm objects
      if (book.subjects && book.subjects.length) {
        for (let index = 0; index < book.subjects.length; index++) {
          const newSubject: Subject = realm.create('Subject', {
            name: book.subjects[index].name,
            url: book.subjects[index].url,
          });

          constructedBook.subjects.push(newSubject);
        }
      }

      // iterate tableOfContents and create new TableOfContents Realm objects
      // if (book.tableOfContents && book.tableOfContents.length) {
      //   for (let index = 0; index < book.tableOfContents.length; index++) {
      //     const newTableOfContents: TableOfContents = realm.create(
      //       'TableOfContents',
      //       {
      //         level: book.tableOfContents[index].level,
      //         title: book.tableOfContents[index].title,
      //         pagenumb: book.tableOfContents[index].pagenumb,
      //       },
      //     );

      //     constructedBook.tableOfContents.push(newTableOfContents);
      //   }
      // }

      const destinationCubby: Cubby | null = realm.objectForPrimaryKey(
        'Cubby',
        destinationCubbyId,
      );

      // realm.write(() => {
      //   const newBook: Book = realm.create(
      //     'Book',
      //     Book.generate({
      // authors: book.authors,
      // cover: book.cover,
      // ebooks: book.ebooks,
      // excerpts: book.excerpts,
      // identifiers: book.identifiers,
      // key: book.key,
      // links: book.links,
      // numberOfPages: book.number_of_pages,
      // notes: book.notes,
      // publishDate: book.publishDate,
      // publishers: book.publishers,
      // subjects: book.subjects,
      // subtitle: book.subtitle,
      // tableOfContents: book.table_of_contents,
      // title: book.title,
      // url: book.url,
      //     }),
      //   );

      //   // Assuming all cubbies have 1 section.
      //   destinationCubby?.sections[0].books.push(newBook);

      //   handleModalClose();

      //   return newCubby;
      // });
    },
    [realm],
  );

  return (
    <ScrollView style={[styles.container, handleModalOpacity()]}>
      <AppHeaderText level={2}>{book.title}</AppHeaderText>
      {/* TODO: add description when available */}
      <AppText>If book description, put it here.</AppText>

      <AppText>{JSON.stringify(book, null, 2)}</AppText>

      {/* TODO: Add placeholder for books with no cover */}
      {book.cover && book.cover.medium && (
        <Image
          style={styles.image}
          source={{
            uri: book.cover.medium,
          }}
        />
      )}

      <AppButton
        onPress={() => {
          setBookFormVisible(true);
          setOpacityLevel(0.25);
        }}
        title="Add to Cubby"
        options={{
          customStyle: styles.customButtonStyle,
          fullWidth: false,
          largeText: true,
        }}
      />

      {/* TODO: Only show if it's in a cubby. */}
      <AppButton
        title="Delete book"
        onPress={() => {
          //TODO: add confirmation
          realm.write(() => {
            realm.delete(book);
          });
        }}
      />

      <AddBookForm
        bookInfo={book}
        onSubmit={handleAddBook}
        onClose={handleModalClose}
        visible={bookFormVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 14,
    marginVertical: 10,
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: 125,
    marginRight: 10,
  },
  customButtonStyle: {
    marginVertical: 30,
    width: 300,
  },
});
