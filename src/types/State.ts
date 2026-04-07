import type { Book, Genre, Series } from "./Book";

export type LibraryState = {
  books: Book[];
  series: Series[];
  genres: Genre[];
};
