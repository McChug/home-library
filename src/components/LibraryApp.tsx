import { useState } from "react";
import "./LibraryApp.css";
import {
  books as seedBooks,
  series as seedSeries,
  genres as seedGenres,
} from "../fixtures";
import type { Book } from "../schemas/book.schema";
import BookGrid from "./BookGrid";
import Search from "./Search";
import BookDetail from "./BookDetail";
import { useMatch, useParams } from "react-router";
import EditBookDetail from "./EditBookDetail/EditBookDetail";
import { useLibrary } from "../hooks/useLibrary";
import { DEFAULT_LIBRARY } from "../constants";
import type { Library, Series } from "../schemas/library.schema";

const seedLibrary: Library = {
  books: seedBooks,
  genres: seedGenres,
  series: seedSeries,
};

const devMode = true;
const starterLibrary = devMode ? seedLibrary : DEFAULT_LIBRARY;

function LibraryApp() {
  const [library, handleSaveBook, handleDeleteBook] =
    useLibrary(starterLibrary);
  const [query, setQuery] = useState<string>("");
  const { bookId } = useParams();

  const editMatch = useMatch("/book/:bookId/edit");
  const addMatch = useMatch("/book/add");
  const isEditing = Boolean(editMatch || addMatch);

  const selectedBook = library.books.find((b) => b.id === bookId) ?? null;
  const selectedBookId = selectedBook?.id ?? null;

  const selectedSeries: Series | undefined =
    selectedBook?.kind === "series"
      ? library.series.find((s) => s.id === selectedBook.seriesId)
      : undefined;

  const seriesBooks: Book[] =
    selectedBook?.kind === "series"
      ? library.books.filter(
          (b): b is Extract<Book, { kind: "series" }> =>
            b.kind === "series" && b.seriesId === selectedBook.seriesId,
        )
      : [];

  const filteredBooks = library.books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  );

  const filterBooks = (s: string) => setQuery(s);

  return (
    <main>
      <section className="content">
        {isEditing ? (
          <EditBookDetail
            book={selectedBook}
            library={library}
            onSave={handleSaveBook}
            onDelete={handleDeleteBook}
          />
        ) : (
          <BookDetail
            book={selectedBook}
            genres={library.genres}
            series={
              selectedSeries && seriesBooks
                ? { info: selectedSeries, books: seriesBooks }
                : undefined
            }
          />
        )}
        <Search filterBooks={filterBooks} />
      </section>
      <section className="book-list">
        <BookGrid books={filteredBooks} selectedBookId={selectedBookId} />
      </section>
    </main>
  );
}

export default LibraryApp;
