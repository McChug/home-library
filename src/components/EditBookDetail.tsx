import React, { useReducer, useState } from "react";
import { bookToFields, fieldsToBook, validate } from "./editBookDetailHelpers";
import type {
  BookFormAction,
  BookFormFields,
  BookFormState,
  FormOwnershipKind,
} from "../types/bookForm";
import type { EditBookDetailProps } from "../types/editBookDetailProps";
import { Link } from "react-router";
import { useBookCover } from "../hooks/useBookCover";
import type { AsyncState, FetchAction } from "../types/fetch";
import { fetchJsonUnkown, formatFetchError } from "../api/fetchJsonUnknown";
import { OPENBOOK_API_URL } from "../constants";
import type { BookDto } from "../schemas/dto.schema";
import { bookDtoToPayload, parseBookDto } from "../api/bookDto";

function assertNever(x: never): never {
  throw new Error(`Unexpected case: ${JSON.stringify(x)}`);
}

function fetchReducer<T>(
  _state: AsyncState<T>,
  action: FetchAction<T>,
): AsyncState<T> {
  switch (action.type) {
    case "LOAD_START":
      return { status: "loading" };
    case "LOAD_SUCCESS":
      return { status: "success", data: action.data };
    case "LOAD_ERROR":
      return { status: "error", message: action.message };
    default:
      return assertNever(action as never);
  }
}

function formReducer(
  state: BookFormState,
  action: BookFormAction,
): BookFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        status: "editing",
        fields: { ...state.fields, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_GENRES":
      return {
        ...state,
        status: "editing",
        fields: { ...state.fields, genreIds: action.value },
        errors: { ...state.errors, genreIds: undefined },
      };
    case "SET_OWNERSHIP_KIND":
      return {
        ...state,
        status: "editing",
        fields: {
          ...state.fields,
          ownershipKind: action.kind,
          // Clear the platform property when leaving digital kind of ownership
          ownershipPlatform:
            action.kind === "digital" ? state.fields.ownershipPlatform : "",
        },
        errors: { ...state.errors, ownershipPlatform: undefined },
      };
    case "SET_COVER_IMAGE":
      if (state.fields.coverPreviewUrl) {
        URL.revokeObjectURL(state.fields.coverPreviewUrl);
      }

      return {
        ...state,
        status: "editing",
        fields: {
          ...state.fields,
          coverImage: action.file,
          coverPreviewUrl: action.previewUrl,
        },
        errors: { ...state.errors, coverImage: undefined },
      };
    case "POPULATE_FROM_FETCH":
      return {
        ...state,
        status: "editing",
        fields: {
          ...state.fields,
          ...action.payload,
        },
        errors: {
          ...state.errors,
          title: undefined,
          author: undefined,
          isbn: undefined,
          publishedDate: undefined,
        },
      };
    case "SUBMIT": {
      const errors = validate(state.fields);
      if (Object.keys(errors).length > 0) {
        return { ...state, status: "editing", errors };
      }
      return { ...state, status: "saving", errors: {} };
    }
    case "SAVE_SUCCESS":
      return { ...state, status: "success", errors: {} };
    case "SAVE_ERROR":
      return { ...state, status: "error", saveError: action.message };
    default:
      return assertNever(action as never);
  }
}

function EditBookDetail({ book, library, onSave }: EditBookDetailProps) {
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

      const coverBlob = fields.coverImage
        ? new Blob([await fields.coverImage.arrayBuffer()], {
            type: fields.coverImage.type,
          })
        : null;

      onSave(updatedBook, newSeries, coverBlob);

      formDispatch({ type: "SAVE_SUCCESS" });
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

    const url = `${OPENBOOK_API_URL}${isbn}.json`;

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
      {book ? (
        <Link to={`/book/${book.id}`}>Cancel</Link>
      ) : (
        <Link to={"/"}>Cancel</Link>
      )}

      {status === "error" && formState.saveError && (
        <p role="alert" className="form-feedback form-feedback--error">
          {formState.saveError}
        </p>
      )}

      {!book && (
        <div>
          <p>Add new book with ISBN</p>
          <input
            type="text"
            value={isbnFetchInput}
            onChange={(e) => setIsbnFetchInput(e.target.value)}
          />
          <button
            onClick={handleFetch}
            disabled={fetchState.status === "loading"}
          >
            {fetchState.status === "loading" ? "Fetching…" : "Fill Form"}
          </button>
          {fetchState.status === "error" && (
            <p role="alert" className="form-feedback form-feedback--error">
              {fetchState.message}
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="book-detail-split">
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

          <div>
            <div className="book-detail-meta">
              <div className="book-detail-group">
                <div>
                  <label htmlFor="edit-title">Title</label>
                  <input
                    id="edit-title"
                    type="text"
                    value={fields.title}
                    onChange={setField("title")}
                    disabled={isSaving}
                  />
                  {errors.title && (
                    <span id="err-title" role="alert" className="field-error">
                      {errors.title}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-author">Author</label>
                  <input
                    id="edit-author"
                    type="text"
                    value={fields.author}
                    onChange={setField("author")}
                    disabled={isSaving}
                  />
                  {errors.author && (
                    <span id="err-author" role="alert" className="field-error">
                      {errors.author}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-isbn">ISBN</label>
                  <input
                    id="edit-isbn"
                    type="text"
                    value={fields.isbn}
                    onChange={setField("isbn")}
                    disabled={isSaving}
                    placeholder="Optional"
                  />
                  {errors.isbn && (
                    <span id="err-isbn" role="alert" className="field-error">
                      {errors.isbn}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="edit-published">Published</label>
                  <input
                    id="edit-published"
                    type="date"
                    value={fields.publishedDate}
                    onChange={setField("publishedDate")}
                    disabled={isSaving}
                  />
                  {errors.publishedDate && (
                    <span
                      id="err-published"
                      role="alert"
                      className="field-error"
                    >
                      {errors.publishedDate}
                    </span>
                  )}
                </div>

                <div>
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
                  {errors.genreIds && (
                    <span id="err-genres" role="alert" className="field-error">
                      {errors.genreIds}
                    </span>
                  )}
                </div>
              </div>

              <div className="book-detail-group">
                <div>
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
                  <div>
                    <label htmlFor="edit-series-name">New Series Name</label>
                    <input
                      id="edit-series-name"
                      type="text"
                      value={fields.seriesNewName}
                      onChange={setField("seriesNewName")}
                      disabled={isSaving}
                    />
                    {errors.seriesNewName && (
                      <span role="alert" className="field-error">
                        {errors.seriesNewName}
                      </span>
                    )}
                  </div>
                )}

                {fields.seriesId && (
                  <div>
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
                    {errors.seriesOrder && (
                      <span role="alert" className="field-error">
                        {errors.seriesOrder}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="book-detail-group">
                <div>
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
                    <option value="unowned">Unowned</option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                {fields.ownershipKind === "digital" && (
                  <div>
                    <label htmlFor="edit-platform">Platform</label>
                    <input
                      id="edit-platform"
                      type="text"
                      value={fields.ownershipPlatform}
                      onChange={setField("ownershipPlatform")}
                      disabled={isSaving}
                      placeholder="e.g. Kindle, Kobo"
                    />
                    {errors.ownershipPlatform && (
                      <span
                        id="err-platform"
                        role="alert"
                        className="field-error"
                      >
                        {errors.ownershipPlatform}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="book-detail-group">
                <div>
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

            <div className="book-detail-actions">
              <button type="submit" disabled={isSaving}>
                {isSaving ? "Saving…" : "Save"}
              </button>
              {status === "success" && <p>Successfully Saved!</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBookDetail;
