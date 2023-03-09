export type bookAPIRaw = {
  authors: {name: string; url: string}[];
  // Not used in Realm Book schema.
  classifications?: {
    lc_classifications?: string[];
    dewey_decimal_class?: string[];
  };
  cover?: {
    large?: string;
    medium?: string;
    small?: string;
  };
  ebooks?: {preview_url: string}[];
  excerpts?: {comment: string; text: string}[];
  identifiers: {
    isbn_10?: string[];
    isbn_13?: string[];
    openlibrary?: string[];
    wikidata?: string[];
    google?: string[];
    lccn?: string[];
    amazon?: string[];
    oclc?: string[];
    librarything?: string[];
    project_gutenberg?: string[];
    goodreads?: string[];
  };
  key: string;
  links?: {url: string; title: string}[];
  number_of_pages: number;
  notes?: string;
  publish_date: string;
  // Not used in Realm Book schema.
  publish_places?: {name: string}[];
  publishers: {name: string}[];
  // Not used in Realm Book schema.
  subject_people?: {name: string; url: string}[];
  // Not used in Realm Book schema.
  subject_places?: {name: string; url: string}[];
  // Not used in Realm Book schema.
  subject_times?: {name: string; url: string}[];
  subjects?: {name: string; url: string}[];
  subtitle?: string;
  tableOfContents: {level: number; title: string; pagenumb: number}[];
  title: string;
  url: string;
  // Not used in Realm Book schema.
  weight?: string;
};
