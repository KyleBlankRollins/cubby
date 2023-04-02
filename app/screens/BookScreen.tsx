import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {BookScreenNavigationProp} from '../navigation/types';
import {BookScreenRouteProp} from '../navigation/types';
import {AppButton} from '../baseComponents/AppButton';
import {AppText} from '../baseComponents/AppText';
import {AppHeaderText} from '../baseComponents/AppHeaderText';
import {AddBookForm} from '../components/AddBookForm';

import {Book} from '../models/Book';
import {RawBook} from '../models/gBookApiRaw';
import {Section} from '../models/Section';
import {Cubby} from '../models/Cubby';
import {RealmContext} from '../models';
import {
  Author,
  ImageLinks,
  Ebook,
  Excerpt,
  Identifier,
  Link,
  Publisher,
  Subject,
  TableOfContents,
} from '../models/EmbeddedObjects';

const {useRealm, useObject} = RealmContext;

export const BookScreen: React.FC<BookScreenNavigationProp> = () => {
  // const [isInRealm, setIsInRealm] = useState(false);
  const [bookFormVisible, setBookFormVisible] = useState(false);
  const [opacityLevel, setOpacityLevel] = useState(1);
  const [book, setBook] = useState<Book | RawBook>();

  const route = useRoute<BookScreenRouteProp>();
  const {bookInfo} = route.params;
  const realmBook = useObject(Book, bookInfo.id);

  const realm = useRealm();

  useEffect(() => {
    if (realmBook) {
      setBook(realmBook);
    } else {
      setBook(bookInfo);

      return;
    }
  }, [realm, realmBook, bookInfo, setBook]);

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

      let identifiers = [];
      let cover: ImageLinks;

      // iterate identifiers and create new Identifier Realm objects
      if (book.identifiers) {
        for (const identifier of book.identifiers) {
          const newIdentifier: Identifier = realm.create('Identifier', {
            type: identifier.type,
            identifier: identifier.identifier,
          });

          identifiers.push(newIdentifier);
        }
      }

      // create new ImageLinks Realm object for cover object
      if (book.imageLinks) {
        const newCover: ImageLinks = realm.create('ImageLinks', {
          smallThumbnail: book.imageLinks.smallThumbnail,
          thumbnail: book.imageLinks.thumbnail,
        });

        cover = newCover;
      }

      const destinationCubby: Cubby | null = realm.objectForPrimaryKey(
        'Cubby',
        destinationCubbyId,
      );

      realm.write(() => {
        const newBook: Book = realm.create('Book', {
          _id: book.id,
          authors: book.authors,
          imageLinks: cover,
          description: book.description ? book.description : '',
          industryIdentifiers: book.industryIdentifiers,
          infoLink: book.infoLink,
          subtitle: book.subtitle,
          numberOfPages: book.number_of_pages,
          notes: book.notes,
          publishDate: book.publishDate,
          publisher: book.publisher,
          subjects: book.subjects,
          subtitle: book.subtitle,
          tableOfContents: book.table_of_contents,
          title: book.title,
          url: book.url,
        });

        // Assuming all cubbies have 1 section.
        destinationCubby?.sections[0].books.push(newBook);

        handleModalClose();

        return newCubby;
      });
    },
    [realm, book],
  );

  if (!book) {
    return (
      <View>
        <AppText>Not ready to render.</AppText>
      </View>
    );
  } else {
    return (
      <ScrollView style={[styles.container, handleModalOpacity()]}>
        <AppHeaderText level={2}>{book.title}</AppHeaderText>
        <AppHeaderText level={4}>by {book.authors}</AppHeaderText>

        {/* TODO: Figure out how to programmatically chunk descriptions into paragraphs. */}
        <AppText>{book.description}</AppText>

        <AppText>{JSON.stringify(book, null, 2)}</AppText>

        {/* TODO: Add placeholder for books with no cover */}
        {book.imageLinks && (
          <Image
            style={styles.image}
            source={{
              uri: book.imageLinks!.thumbnail,
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
          bookInfo={book}
          onSubmit={handleAddBook}
          onClose={handleModalClose}
          visible={bookFormVisible}
        />
      </ScrollView>
    );
  }
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
