import React, { useReducer, useState } from "react";
import { bookToFields, fieldsToBook, validate } from "./helpers";
import type { BookFormFields, FormOwnershipKind } from "@/types/bookForm";
import type { EditBookDetailProps } from "@/types/editBookDetailProps";
import { Link, useNavigate } from "react-router";
import { useBookCover } from "@/hooks/useBookCover";
import { fetchJsonUnkown, formatFetchError } from "@/api/fetchJsonUnknown";
import { OPENBOOK_API_URL_FRONT, OPENBOOK_API_URL_BACK } from "@/constants";
import type { BookDto } from "@/schemas/dto.schema";
import { bookDtoToPayload, parseBookDto } from "@/api/bookDto";
import { formReducer, fetchReducer } from "./reducers";

function EditBookDetail({
  book,
  library,
  onSave,
  onDelete,
}: EditBookDetailProps) {
  const navigate = useNavigate();
  const initialFields = bookToFields(book);
  const existingCoverUrl = useBookCover(book?.id ?? "");

  const [formState, formDispatch] = useReducer(formReducer, {
    status: "editing",
    fields: initialFields,
    errors: {},
  });
  const [fetchState, fetchDispatch] = useReducer(fetchReducer<BookDto>, {
    status: "idle",
  });

  const [isbnFetchInput, setIsbnFetchInput] = useState("");

  const { genres, series } = library;
  const { fields, errors, status } = formState;
  const isSaving = status === "saving";

  const isFetching = fetchState.status === "loading";

  const displayCoverUrl = fields.coverPreviewUrl ?? existingCoverUrl;

  function setField(field: keyof BookFormFields) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => formDispatch({ type: "SET_FIELD", field, value: e.target.value });
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    formDispatch({ type: "SUBMIT" });

    const errors = validate(fields);
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const { book: updatedBook, newSeries } = fieldsToBook(
        book,
        fields,
        library,
      );

      // if a coverPreviewUrl exists without a coverBlob, it's because the url is from the open library api
      const coverBlob = fields.coverImage
        ? new Blob([await fields.coverImage.arrayBuffer()], {
            type: fields.coverImage.type,
          })
        : fields.coverPreviewUrl
          ? await fetch(fields.coverPreviewUrl).then((r) => r.blob())
          : null;

      onSave(updatedBook, newSeries, coverBlob);

      formDispatch({ type: "SAVE_SUCCESS" });
      navigate(`/book/${updatedBook.id}`);
    } catch (err) {
      formDispatch({
        type: "SAVE_ERROR",
        message: err instanceof Error ? err.message : "Save failed",
      });
    }
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    const url = URL.createObjectURL(file);

    formDispatch({
      type: "SET_COVER_IMAGE",
      file,
      previewUrl: url,
    });
  }

  function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    formDispatch({
      type: "SET_GENRES",
      value: Array.from(e.target.selectedOptions, (opt) => opt.value),
    });
  }

  async function handleFetch() {
    const isbn = isbnFetchInput.trim();
    if (!isbn) return;

    fetchDispatch({ type: "LOAD_START" });

    const url = OPENBOOK_API_URL_FRONT + isbn + OPENBOOK_API_URL_BACK;

    const controller = new AbortController();
    const { signal } = controller;

    const result = await fetchJsonUnkown(url, { signal });
    if (!result.ok) {
      if (result.error.kind === "aborted") return;
      fetchDispatch({
        type: "LOAD_ERROR",
        message: formatFetchError(result.error),
      });
      return;
    }

    const parseResult = parseBookDto(result.data);
    if (!parseResult.ok) {
      fetchDispatch({
        type: "LOAD_ERROR",
        message: formatFetchError(parseResult.error),
      });
      return;
    }

    fetchDispatch({ type: "LOAD_SUCCESS", data: parseResult.data });
    formDispatch({
      type: "POPULATE_FROM_FETCH",
      payload: bookDtoToPayload(parseResult.data, isbn),
    });
  }

  return (
    <div>
      {status === "error" && formState.saveError && (
        <p role="alert" className="form-feedback form-feedback--error">
          {formState.saveError}
        </p>
      )}

      {!book && (
        <div>
          <p>Optional: Add new book with ISBN</p>
          <div className="add-new">
            <input
              type="text"
              value={isbnFetchInput}
              onChange={(e) => setIsbnFetchInput(e.target.value)}
            />
            <button
              className="btn-secondary"
              onClick={handleFetch}
              disabled={isFetching}
            >
              {isFetching ? "Fetching…" : "Fill Form"}
            </button>
            {fetchState.status === "error" && (
              <p role="alert" className="form-feedback form-feedback--error">
                {fetchState.message}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="book-detail-split">
          <div className="book-detail-cover-section">
            <div className="book-detail-cover">
              {displayCoverUrl && <img src={displayCoverUrl} alt="" />}
              <div className="book-detail-cover-edit">
                <label htmlFor="edit-cover">Change Cover Image</label>
                <input
                  id="edit-cover"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  disabled={isSaving}
                />
              </div>
            </div>
            <button className="btn" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            {status === "success" && <p>Successfully Saved!</p>}
            {book ? (
              <>
                <Link to={`/book/${book.id}`} className="btn">
                  Cancel
                </Link>
                <button
                  className="btn-secondary"
                  type="button"
                  disabled={isSaving}
                  onClick={() => {
                    if (!book) return;

                    const confirmed = window.confirm(
                      `Delete "${book.title}"? This cannot be undone.`,
                    );

                    if (confirmed) {
                      onDelete(book.id);
                    }

                    navigate("/");
                  }}
                >
                  Delete Book
                </button>
              </>
            ) : (
              <Link to={"/"} className="btn">
                Cancel
              </Link>
            )}
          </div>

          <div className="book-detail-meta">
            <div className="book-detail-group">
              <h2 className="book-detail-group-heading">Details</h2>
              <div className="book-detail-group-body">
                <div className="book-detail-group-pair">
                  <label htmlFor="edit-title">Title</label>
                  <input
                    id="edit-title"
                    type="text"
                    value={fields.title}
                    onChange={setField("title")}
                    disabled={isSaving}
                  />
                </div>
                {errors.title && (
                  <span id="err-title" role="alert" className="field-error">
                    {errors.title}
                  </span>
                )}

                <div className="book-detail-group-pair">
                  <label htmlFor="edit-author">Author</label>
                  <input
                    id="edit-author"
                    type="text"
                    value={fields.author}
                    onChange={setField("author")}
                    disabled={isSaving}
                  />
                </div>
                {errors.author && (
                  <span id="err-author" role="alert" className="field-error">
                    {errors.author}
                  </span>
                )}

                <div className="book-detail-group-pair">
                  <label htmlFor="edit-published">Published</label>
                  <input
                    id="edit-published"
                    type="date"
                    value={fields.publishedDate}
                    onChange={setField("publishedDate")}
                    disabled={isSaving}
                  />
                </div>
                {errors.publishedDate && (
                  <span id="err-published" role="alert" className="field-error">
                    {errors.publishedDate}
                  </span>
                )}

                <div className="book-detail-group-pair">
                  <label htmlFor="edit-isbn">ISBN</label>
                  <input
                    id="edit-isbn"
                    type="text"
                    value={fields.isbn}
                    onChange={setField("isbn")}
                    disabled={isSaving}
                    placeholder="Optional"
                  />
                </div>
                {errors.isbn && (
                  <span id="err-isbn" role="alert" className="field-error">
                    {errors.isbn}
                  </span>
                )}
              </div>

              <div className="book-detail-group">
                <h2 className="book-detail-group-heading">Classification</h2>
                <div className="book-detail-group-body">
                  <div className="book-detail-group-pair">
                    <label>Genre(s)</label>
                    <select
                      id="edit-genres"
                      multiple
                      value={fields.genreIds}
                      onChange={handleGenreChange}
                      disabled={isSaving}
                    >
                      {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.genreIds && (
                    <span id="err-genres" role="alert" className="field-error">
                      {errors.genreIds}
                    </span>
                  )}
                  <div className="book-detail-group-pair">
                    <label>Series</label>
                    <select
                      id="edit-series"
                      value={fields.seriesId}
                      onChange={setField("seriesId")}
                      disabled={isSaving}
                    >
                      <option value="">No series (standalone)</option>
                      {series.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                      <option value="_new">+ Add new series...</option>
                    </select>
                  </div>
                  {fields.seriesId === "_new" && (
                    <div className="book-detail-group-pair">
                      <label htmlFor="edit-series-name">New Series Name</label>
                      <input
                        id="edit-series-name"
                        type="text"
                        value={fields.seriesNewName}
                        onChange={setField("seriesNewName")}
                        disabled={isSaving}
                      />
                    </div>
                  )}
                  {errors.seriesNewName && (
                    <span role="alert" className="field-error">
                      {errors.seriesNewName}
                    </span>
                  )}

                  {fields.seriesId && (
                    <div className="book-detail-group-pair">
                      <label htmlFor="edit-series-order">Order in Series</label>
                      <input
                        id="edit-series-order"
                        type="number"
                        min={1}
                        step={1}
                        value={fields.seriesOrder}
                        onChange={setField("seriesOrder")}
                        disabled={isSaving}
                      />
                    </div>
                  )}
                  {errors.seriesOrder && (
                    <span role="alert" className="field-error">
                      {errors.seriesOrder}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="book-detail-group">
              <h2 className="book-detail-group-heading">Ownership & Notes</h2>
              <div className="book-detail-group-body">
                <div className="book-detail-group-pair">
                  <label htmlFor="edit-ownership-kind">Ownership</label>
                  <select
                    id="edit-ownership-kind"
                    value={fields.ownershipKind}
                    onChange={(e) =>
                      formDispatch({
                        type: "SET_OWNERSHIP_KIND",
                        kind: e.target.value as FormOwnershipKind,
                      })
                    }
                    disabled={isSaving}
                  >
                    <option value="wishlist">Wishlist</option>
                    <option value="hardcover">Hardcover</option>
                    <option value="paperback">Paperback</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                {fields.ownershipKind === "digital" && (
                  <div className="book-detail-group-pair">
                    <label htmlFor="edit-platform">Platform</label>
                    <input
                      id="edit-platform"
                      type="text"
                      value={fields.ownershipPlatform}
                      onChange={setField("ownershipPlatform")}
                      disabled={isSaving}
                      placeholder="e.g. Kindle, Kobo"
                    />
                  </div>
                )}
                {errors.ownershipPlatform && (
                  <span id="err-platform" role="alert" className="field-error">
                    {errors.ownershipPlatform}
                  </span>
                )}

                <div className="book-detail-group-pair">
                  <label htmlFor="edit-notes">Notes</label>
                  <textarea
                    id="edit-notes"
                    value={fields.notes}
                    onChange={setField("notes")}
                    disabled={isSaving}
                    rows={4}
                    placeholder="Optional"
                  />
                </div>
              </div>
            </div>

            <div className="book-detail-readthroughs">
              <h2 className="book-detail-group-heading">Readthroughs</h2>
              {fields.readthroughs.map((r, i) => (
                <div key={i} className="book-detail-readthrough">
                  <div className="book-detail-group-body">
                    <div className="book-detail-group-pair">
                      <label htmlFor={`edit-readthrough-date-${i}`}>
                        Finished on
                      </label>
                      <input
                        id={`edit-readthrough-date-${i}`}
                        type="date"
                        value={r.finishedAt}
                        onChange={(e) =>
                          formDispatch({
                            type: "SET_READTHROUGH_FIELD",
                            index: i,
                            field: "finishedAt",
                            value: e.target.value,
                          })
                        }
                        disabled={isSaving}
                      />
                    </div>

                    <div className="book-detail-group-pair">
                      <label htmlFor={`edit-readthrough-rating-${i}`}>
                        Rating
                      </label>
                      <input
                        id={`edit-readthrough-rating-${i}`}
                        type="number"
                        min={1}
                        max={5}
                        step={1}
                        value={r.rating}
                        onChange={(e) =>
                          formDispatch({
                            type: "SET_READTHROUGH_FIELD",
                            index: i,
                            field: "rating",
                            value: e.target.value,
                          })
                        }
                        disabled={isSaving}
                        placeholder="Optional"
                      />
                    </div>

                    <div className="book-detail-group-pair">
                      <label htmlFor={`edit-readthrough-notes-${i}`}>
                        Notes
                      </label>
                      <textarea
                        id={`edit-readthrough-notes-${i}`}
                        value={r.notes}
                        onChange={(e) =>
                          formDispatch({
                            type: "SET_READTHROUGH_FIELD",
                            index: i,
                            field: "notes",
                            value: e.target.value,
                          })
                        }
                        disabled={isSaving}
                        rows={3}
                        placeholder="Optional"
                      />
                    </div>
                    {errors.readthroughs?.[i] && (
                      <span role="alert" className="field-error">
                        {errors.readthroughs[i]}
                      </span>
                    )}

                    <div>
                      <button
                        className="btn"
                        type="button"
                        onClick={() =>
                          formDispatch({ type: "REMOVE_READTHROUGH", index: i })
                        }
                        disabled={isSaving}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                className="btn"
                type="button"
                onClick={() => formDispatch({ type: "ADD_READTHROUGH" })}
                disabled={isSaving}
              >
                + Add readthrough
              </button>
            </div>

            <div className="book-detail-actions"></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBookDetail;
