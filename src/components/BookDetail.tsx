import "./BookDetail.css";
import { Link } from "react-router";
import type { Book } from "../types/Book";
import { toTitleCase } from "../helpers/ToTitleCase";
import { EM_DASH } from "../constants";
import type { BookDetailProps } from "../types/BookDetailProps";

// Claude assisted with generating a defition list structure that I built off of
function BookDetail({ book, genres, series }: BookDetailProps) {
  return (
    <>
      {!book ? (
        <div className="page-title">
          <h1>Home Library Catalog</h1>
          <Link to={"/book/add"}>Add New Book</Link>
        </div>
      ) : (
        <div>
          <div className="top-bar">
            <Link to="/">Back</Link>
            <Link to={`/book/${book.id}/edit`}>Edit</Link>
          </div>
          <div className="book-detail-split">
            <div className="book-detail-cover">
              {book.coverUrl && <img src={book.coverUrl} alt="" />}
            </div>

            <div>
              <dl className="book-detail-meta">
                <div className="book-detail-group">
                  <div>
                    <dt>Title</dt>
                    <dd>{book.title}</dd>
                  </div>
                  <div>
                    <dt>Author</dt>
                    <dd>{book.author}</dd>
                  </div>
                  {book.isbn && (
                    <div>
                      <dt>ISBN</dt>
                      <dd>{book.isbn}</dd>
                    </div>
                  )}
                  {book.publishedDate && (
                    <div>
                      <dt>Published</dt>
                      <dd>
                        {book.publishedDate.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </dd>
                    </div>
                  )}
                  {book.genreIds.length > 0 && (
                    <div>
                      <dt>Genre(s)</dt>
                      <dd>
                        {book.genreIds
                          .map((id) => genres.find((g) => g.id === id)?.name)
                          .join(", ")}
                      </dd>
                    </div>
                  )}
                </div>

                {book.kind === "series" && series && (
                  <div className="book-detail-group">
                    {series.books && series.books.length > 0 && (
                      <div>
                        <dt>Series</dt>
                        <dd>
                          <p>{series.info.name}</p>
                          <ol className="book-detail-series-list">
                            {series.books
                              .filter(
                                (b): b is Extract<Book, { kind: "series" }> =>
                                  b.kind === "series",
                              )
                              .sort((a, b) => a.seriesOrder - b.seriesOrder)
                              .map((b) => (
                                <li
                                  key={b.id}
                                  className={
                                    b.id === book.id
                                      ? "book-detail-series-current"
                                      : undefined
                                  }
                                  aria-current={
                                    b.id === book.id ? "page" : undefined
                                  }
                                >
                                  {b.title}
                                </li>
                              ))}
                          </ol>
                        </dd>
                      </div>
                    )}
                  </div>
                )}

                <div className="book-detail-group">
                  <div>
                    <dt>Ownership</dt>
                    <dd>
                      {toTitleCase(book.userData.ownership.kind)}
                      {book.userData.ownership.kind === "digital" &&
                        ` ${EM_DASH} ` + book.userData.ownership.platform}
                    </dd>
                  </div>
                </div>

                {book.userData.notes && (
                  <div className="book-detail-group">
                    <div>
                      <dt>Notes</dt>
                      <dd>{book.userData.notes}</dd>
                    </div>
                  </div>
                )}
              </dl>

              {book.userData.readthroughs &&
                book.userData.readthroughs.length > 0 && (
                  <section className="book-detail-readthroughs">
                    <h2>Readthroughs</h2>
                    {book.userData.readthroughs.map((rt, i) => (
                      <dl key={i} className="book-detail-readthrough">
                        <div>
                          <dt>Finished</dt>
                          <dd>{rt.finishedAt.toLocaleDateString()}</dd>
                        </div>
                        <div>
                          <dt>Rating</dt>
                          <dd>{rt.rating ?? "Unrated"}</dd>
                        </div>
                        {rt.notes && (
                          <div>
                            <dt>Notes</dt>
                            <dd>{rt.notes}</dd>
                          </div>
                        )}
                      </dl>
                    ))}
                  </section>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookDetail;
