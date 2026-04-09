import { useState } from "react";
import "./Library.css";
import {
  books as initialBooks,
  series as initialSeries,
  genres as initialGenres,
} from "../seed-data";
import type { Book } from "../types/Book";
import BookGrid from "./BookLists/BookGrid";
import Search from "./Search";
import BookDetail from "./BookDetail";
import { useParams } from "react-router";
import type { LibraryState } from "../types/State";

const initialLibraryState: LibraryState = {
  books: initialBooks,
  series: initialSeries,
  genres: initialGenres,
};

function Library() {
  const [library, setLibrary] = useState<LibraryState>(initialLibraryState);
  const [query, setQuery] = useState<string>("");
  const { bookId } = useParams();

  const selectedBook = library.books.find((b) => b.id === bookId) ?? null;
  const selectedBookId = selectedBook?.id ?? null;

  const selectedSeries =
    selectedBook?.kind === "series"
      ? library.series.find((s) => s.id === selectedBook.seriesId)
      : undefined;

  const seriesBooks =
    selectedBook?.kind === "series"
      ? library.books.filter(
          (b): b is Extract<Book, { kind: "series" }> =>
            b.kind === "series" && b.seriesId === selectedBook.seriesId,
        )
      : undefined;

  const filteredBooks = library.books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  );

  const filterBooks = (s: string) => setQuery(s);

  return (
    <main>
      <section className="content">
        <BookDetail
          book={selectedBook}
          genres={library.genres}
          series={
            selectedSeries && seriesBooks
              ? { info: selectedSeries, books: seriesBooks }
              : undefined
          }
        />
        <Search filterBooks={filterBooks} />
      </section>
      <section className="book-list">
        <BookGrid books={filteredBooks} selectedBookId={selectedBookId} />
      </section>
    </main>
  );
}

export default Library;
