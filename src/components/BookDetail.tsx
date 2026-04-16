import "./BookDetail.css";
import { Link } from "react-router";
import type { Book } from "../schemas/book.schema";
import { toTitleCase } from "../utils/toTitleCase";
import { EM_DASH } from "../constants";
import type { BookDetailProps } from "../types/bookDetailProps";
import { useBookCover } from "../hooks/useBookCover";
import AddBookBtn from "./widgets/AddBookBtn";

function BookDetail({ book, genres, series }: BookDetailProps) {
  const coverUrl = useBookCover(book?.id ?? "");
  const logoSrc = `${import.meta.env.BASE_URL}logo.svg`;

  return (
    <>
      {!book ? (
        <div className="page-title">
          <h1 className="logo-heading">
            <img src={logoSrc} width="400" alt="Home Library Catalog" />
          </h1>
          <AddBookBtn />
        </div>
      ) : (
        <div>
          <div className="book-detail-split">
            <div className="book-detail-cover-section">
              <Link
                to="/"
                className="book-detail-cover move"
                title="Return to Shelf"
              >
                {coverUrl ? <img src={coverUrl} alt="" /> : <p>{book.title}</p>}
              </Link>
              <Link to={`/book/${book.id}/edit`} className="btn">
                Edit
              </Link>
            </div>

            <div className="book-detail-meta">
              <dl className="book-detail-defitions">
                <div className="book-detail-group">
                  <h2 className="book-detail-group-heading">Details</h2>
                  <div className="book-detail-group-body">
                    <div className="book-detail-group-pair">
                      <dt>Title</dt>
                      <dd>{book.title}</dd>
                    </div>
                    <div className="book-detail-group-pair">
                      <dt>Author</dt>
                      <dd>{book.author}</dd>
                    </div>
                    {book.publishedDate && (
                      <div className="book-detail-group-pair">
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
                    {book.isbn && (
                      <div className="book-detail-group-pair">
                        <dt>ISBN</dt>
                        <dd>{book.isbn}</dd>
                      </div>
                    )}
                  </div>
                </div>

                <div className="book-detail-group">
                  <h2 className="book-detail-group-heading">Classification</h2>
                  <div className="book-detail-group-body">
                    {book.genreIds.length > 0 && (
                      <div className="book-detail-group-pair">
                        <dt>Genre(s)</dt>
                        <dd>
                          {book.genreIds
                            .map((id) => genres.find((g) => g.id === id)?.name)
                            .join(", ")}
                        </dd>
                      </div>
                    )}
                    {book.kind === "series" && series && (
                      <div>
                        {series.books && series.books.length > 0 && (
                          <div className="book-detail-group-pair">
                            <dt>Series</dt>
                            <dd>
                              <p>{series.info.name}</p>
                              <ol className="book-detail-series-list">
                                {series.books
                                  .filter(
                                    (
                                      b,
                                    ): b is Extract<Book, { kind: "series" }> =>
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
                                      {`${b.seriesOrder}. ${b.title}`}
                                    </li>
                                  ))}
                              </ol>
                            </dd>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="book-detail-group">
                  <h2 className="book-detail-group-heading">
                    Ownership & Notes
                  </h2>
                  <div className="book-detail-group-body">
                    <div className="book-detail-group-pair">
                      <dt>Ownership</dt>
                      <dd>
                        {toTitleCase(book.userData.ownership.kind)}
                        {book.userData.ownership.kind === "digital" &&
                          ` ${EM_DASH} ` + book.userData.ownership.platform}
                      </dd>
                    </div>
                    {book.userData.notes && (
                      <div className="book-detail-group-pair">
                        <dt>Notes</dt>
                        <dd>{book.userData.notes}</dd>
                      </div>
                    )}
                  </div>
                </div>
              </dl>

              {book.userData.readthroughs &&
                book.userData.readthroughs.length > 0 && (
                  <div className="book-detail-group">
                    <h2 className="book-detail-group-heading">Readthroughs</h2>
                    {book.userData.readthroughs.map((rt, i) => (
                      <div key={i} className="book-detail-readthrough">
                        <div className="book-detail-group-body">
                          <div className="book-detail-group-pair">
                            <dt>Finished</dt>
                            <dd>{rt.finishedAt.toLocaleDateString()}</dd>
                          </div>
                          <div className="book-detail-group-pair">
                            <dt>Rating</dt>
                            <dd>{rt.rating ?? "Unrated"}</dd>
                          </div>
                          {rt.notes && (
                            <div className="book-detail-group-pair">
                              <dt>Notes</dt>
                              <dd>{rt.notes}</dd>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookDetail;
