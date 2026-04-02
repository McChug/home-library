import { useState } from "react";
import "./App.css";
import { books as initialBooks } from "./seed-data";
import type { Book } from "./types/Book";
import BookGrid from "./components/BookLists/BookGrid";
import Search from "./components/Search";
import BookDetail from "./components/BookDetail";

function App() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <>
      <h1>Home Library Catalog</h1>
      <Search />
      <BookGrid books={books} />
      {selectedBook && <BookDetail book={selectedBook} />}
    </>
  );
}

export default App;
