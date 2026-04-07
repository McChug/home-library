import { useState } from "react";
import "./App.css";
import { books as initialBooks } from "./seed-data";
import type { Book } from "./types/Book";
import BookGrid from "./components/BookLists/BookGrid";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";
import { useParams } from "react-router";

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [query, setQuery] = useState<string>("");
  const { bookId } = useParams();

  const selectedBook = books.find((b) => b.id === bookId) ?? null;
  const selectedBookId = selectedBook?.id ?? null;

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  );

  const filterBooks = (s: string) => setQuery(s);

  return (
    <main>
      <section className="content">
        <BookDetail book={selectedBook} />
        <Search filterBooks={filterBooks} />
      </section>
      <section className="book-list">
        <BookGrid books={filteredBooks} selectedBookId={selectedBookId} />
      </section>
    </main>
  );
}

export default App;
