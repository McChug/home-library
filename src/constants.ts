import type { Library } from "./schemas/library.schema";

export const EM_DASH = "—";

export const LIBRARY_KEY = "library";

export const DB_NAME = "book-covers";
export const STORE_NAME = "cover";
export const DB_VERSION = 1;

export const DEFAULT_LIBRARY: Library = {
  books: [],
  genres: [],
  series: [],
};

export const OPENBOOK_API_URL = "https://openlibrary.org/isbn/";
export const OPEN_BOOK_COVER_API_URL = "https://covers.openlibrary.org/b/isbn/";
