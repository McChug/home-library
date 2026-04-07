import "./BookDetail.css";
import { Link } from "react-router";
import type { Book } from "../types/Book";

function BookDetail({ book }: { book: Book | null }) {
  return (
    <>
      {book ? (
        <div>
          <Link to="/">Back</Link>
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          {book.isbn && <p>ISBN: {book.isbn}</p>}
          {book.publishedYear && <p>Published: {book.publishedYear}</p>}
          {book.kind === "series" && (
            <>
              <p>Series Order: {book.seriesOrder}</p>
            </>
          )}

          <p>Ownership: {book.userData.ownership.kind}</p>
          {book.userData.ownership.kind === "digital" && (
            <p>Platform: {book.userData.ownership.platform}</p>
          )}

          {book.userData.notes && <p>Notes: {book.userData.notes}</p>}

          {book.userData.readthroughs && (
            <>
              <p>Readthroughs: {book.userData.readthroughs.length}</p>
              {book.userData.readthroughs.map((rt, i) => (
                <div key={i}>
                  <p>Finished: {rt.finishedAt.toLocaleDateString()}</p>
                  {rt.rating && <p>Rating: {rt.rating}</p>}
                  {rt.notes && <p>Notes: {rt.notes}</p>}
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="page-title">
          <h1>Home Library Catalog</h1>
        </div>
      )}
    </>
  );
}

export default BookDetail;
