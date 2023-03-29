export interface RawBook {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface BookMap {
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  // readingModes: {
  //   text: boolean;
  //   image: boolean;
  // };
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating: number;
  ratingsCount: number;
  maturityRating: string;
  // allowAnonLogging: boolean;
  // contentVersion: string;
  // panelizationSummary: {
  //   containsEpubBubbles: boolean;
  //   containsImageBubbles: boolean;
  // };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  // previewLink: string;
  infoLink: string;
  // canonicalVolumeLink: string;
}

// const bookInfo: RawBook = {
//   id: data.id,
//   title: data.volumeInfo.title,
//   authors: data.volumeInfo.authors,
//   publisher: data.volumeInfo.publisher,
//   publishedDate: data.volumeInfo.publishedDate,
//   description: data.volumeInfo.description,
//   industryIdentifiers: data.volumeInfo.industryIdentifiers,
//   // readingModes: data.volumeInfo.readingModes,
//   pageCount: data.volumeInfo.pageCount,
//   printType: data.volumeInfo.printType,
//   categories: data.volumeInfo.categories,
//   averageRating: data.volumeInfo.averageRating,
//   ratingsCount: data.volumeInfo.ratingsCount,
//   maturityRating: data.volumeInfo.maturityRating,
//   // allowAnonLogging: data.volumeInfo.allowAnonLogging,
//   // contentVersion: data.volumeInfo.contentVersion,
//   // panelizationSummary: data.volumeInfo.panelizationSummary,
//   imageLinks: data.volumeInfo.imageLinks,
//   language: data.volumeInfo.language,
//   // previewLink: data.volumeInfo.previewLink,
//   infoLink: data.volumeInfo.infoLink,
//   // canonicalVolumeLink: data.volumeInfo.canonicalVolumeLink,
// };

// setgBookId(bookInfo.id);

// TODO: check if gBookId matches a book _id in realm.
// const inRealm: Book | undefined = isInRealm(bookInfo.id);

// if(inRealm){
  
// }
