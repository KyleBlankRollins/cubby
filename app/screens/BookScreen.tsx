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
  const {bookInfo} = route.params;

  // const id = JSON.parse(props.bookId);
  const realm = useRealm();
  const realmBook: Realm.Results<Book> = useQuery(Book).filtered(
    `title == "${bookInfo.title}"`,
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
        // TODO: finish creating embedded objects (just TOC left)
        // think about how to streamline this.
        // after constructedBook is complete, can pass to
        // `realm.create('Book')`.
        excerpts: [],
        identifiers: [],
        key: bookInfo.key,
        links: [],
        numberOfPages: bookInfo.number_of_pages,
        notes: bookInfo.notes,
        publishDate: bookInfo.publishDate,
        publishers: [],
        subjects: [],
        subtitle: bookInfo.subtitle,
        tableOfContents: [],
        title: bookInfo.title,
        url: bookInfo.url,
      };

      // iterate authors and create new Author Realm objects
      for (let index = 0; index < bookInfo.authors.length; index++) {
        const newAuthor: Author = realm.create('Author', {
          name: bookInfo.authors[index].name,
          url: bookInfo.authors[index].url,
        });

        constructedBook.authors.push(newAuthor);
      }

      // if cover object exists, create new Cover Realm object
      if (bookInfo.cover) {
        const newCover: Cover = realm.create('Cover', {
          large: bookInfo.cover.large,
          medium: bookInfo.cover.medium,
          small: bookInfo.cover.small,
        });

        constructedBook.cover = newCover;
      }

      // iterate ebooks and create new Ebook Realm objects
      if (bookInfo.ebooks && bookInfo.ebooks.length) {
        for (let index = 0; index < bookInfo.ebooks.length; index++) {
          const newEbook: Ebook = realm.create('Ebook', {
            previewUrl: bookInfo.ebooks[index].preview_url,
          });

          constructedBook.ebooks.push(newEbook);
        }
      }

      // iterate excerpts and create new Excerpt Realm objects
      if (bookInfo.excerpts && bookInfo.excerpts.length) {
        for (let index = 0; index < bookInfo.excerpts.length; index++) {
          const newExcerpt: Excerpt = realm.create('Excerpt', {
            comment: bookInfo.excerpts[index].comment,
            text: bookInfo.excerpts[index].text,
          });

          constructedBook.excerpts.push(newExcerpt);
        }
      }

      // iterate identifiers and create new Identifier Realm objects
      if (bookInfo.identifiers) {
        for (
          let index = 0;
          index < Object.keys(bookInfo.identifiers).length;
          index++
        ) {
          const newIdentifier: Identifier = realm.create('Identifier', {
            identifierType: Object.keys(bookInfo.identifiers)[index],
            identifierValue: Object.keys(bookInfo.identifiers)[index][0],
          });

          constructedBook.identifiers.push(newIdentifier);
        }
      }

      // iterate links and create new Link Realm objects
      if (bookInfo.links && bookInfo.links.length) {
        for (let index = 0; index < bookInfo.links.length; index++) {
          const newLink: Link = realm.create('Link', {
            url: bookInfo.links[index].url,
            title: bookInfo.links[index].title,
          });

          constructedBook.links.push(newLink);
        }
      }

      // iterate publishers and create new Publisher Realm objects
      if (bookInfo.publishers && bookInfo.publishers.length) {
        for (let index = 0; index < bookInfo.publishers.length; index++) {
          const newPublisher: Publisher = realm.create('Publisher', {
            name: bookInfo.publishers[index].name,
          });

          constructedBook.publishers.push(newPublisher);
        }
      }

      // iterate subjects and create new Subject Realm objects
      if (bookInfo.subjects && bookInfo.subjects.length) {
        for (let index = 0; index < bookInfo.subjects.length; index++) {
          const newSubject: Subject = realm.create('Subject', {
            name: bookInfo.subjects[index].name,
            url: bookInfo.subjects[index].url,
          });

          constructedBook.subjects.push(newSubject);
        }
      }

      // iterate tableOfContents and create new TableOfContents Realm objects
      // if (bookInfo.tableOfContents && bookInfo.tableOfContents.length) {
      //   for (let index = 0; index < bookInfo.tableOfContents.length; index++) {
      //     const newTableOfContents: TableOfContents = realm.create(
      //       'TableOfContents',
      //       {
      //         level: bookInfo.tableOfContents[index].level,
      //         title: bookInfo.tableOfContents[index].title,
      //         pagenumb: bookInfo.tableOfContents[index].pagenumb,
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
      // authors: bookInfo.authors,
      // cover: bookInfo.cover,
      // ebooks: bookInfo.ebooks,
      // excerpts: bookInfo.excerpts,
      // identifiers: bookInfo.identifiers,
      // key: bookInfo.key,
      // links: bookInfo.links,
      // numberOfPages: bookInfo.number_of_pages,
      // notes: bookInfo.notes,
      // publishDate: bookInfo.publishDate,
      // publishers: bookInfo.publishers,
      // subjects: bookInfo.subjects,
      // subtitle: bookInfo.subtitle,
      // tableOfContents: bookInfo.table_of_contents,
      // title: bookInfo.title,
      // url: bookInfo.url,
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
      <AppHeaderText level={2}>{bookInfo.title}</AppHeaderText>
      {/* TODO: add description when available */}
      <AppText>If book description, put it here.</AppText>

      <AppText>{JSON.stringify(bookInfo, null, 2)}</AppText>

      {/* TODO: Add placeholder for books with no cover */}
      {bookInfo.cover && bookInfo.cover.medium && (
        <Image
          style={styles.image}
          source={{
            uri: bookInfo.cover.medium,
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
      {/* TODO: Make it delete the cubby book. */}
      <AppButton
        title="Delete book"
        onPress={() => {
          //TODO: add confirmation
          realm.write(() => {
            realm.delete();
          });
        }}
      />

      <AddBookForm
        bookInfo={bookInfo}
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
