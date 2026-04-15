import { genres } from "./fixtures";
import type { Library } from "./schemas/library.schema";

export const EM_DASH = "—";
export const PLUS_CHAR = "+";

export const LIBRARY_KEY = "library";

export const DB_NAME = "book-covers";
export const STORE_NAME = "cover";
export const DB_VERSION = 1;

export const DEFAULT_LIBRARY: Library = {
  books: [],
  genres: genres,
  series: [],
};

export const OPENBOOK_API_URL_FRONT =
  "https://openlibrary.org/api/books?bibkeys=ISBN:";
export const OPENBOOK_API_URL_BACK = "&format=json&jscmd=data";
