import { useReducer } from "react";
import {
  bookToFields,
  fieldsToBook,
  validate,
} from "../helpers/EditBookDetailHelpers";
import type {
  BookFormAction,
  BookFormFields,
  BookFormState,
  FormOwnershipKind,
} from "../types/BookForm";
import type { EditBookDetailProps } from "../types/EditBookDetailProps";
import { Link } from "react-router";

function reducer(state: BookFormState, action: BookFormAction): BookFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        status: "editing",
        fields: { ...state.fields, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
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

    case "RESET":
      return { status: "editing", fields: action.fields, errors: {} };

    default:
      throw new Error();
  }
}

function EditBookDetail({ book, genres, series, onSave }: EditBookDetailProps) {
  const initialFields = bookToFields(book);

  const [state, dispatch] = useReducer(reducer, {
    status: "editing",
    fields: initialFields,
    errors: {},
  });

  const { fields, errors, status } = state;
  const isBusy = status === "saving";

  function set(field: keyof BookFormFields) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => dispatch({ type: "SET_FIELD", field, value: e.target.value });
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });

    // Re-validate synchronously before calling onSave — the reducer's
    // SUBMIT action sets status to "saving" only when there are no errors,
    // but we can't read updated state here, so we validate independently.
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) return;

    if (!book) return; // Can't save without an original book to base changes on

    try {
      const updated = fieldsToBook(book, fields);
      await onSave(updated);
      dispatch({ type: "SAVE_SUCCESS" });
    } catch (err) {
      dispatch({
        type: "SAVE_ERROR",
        message:
          err instanceof Error ? err.message : "An unexpected error occurred.",
      });
    }
  }

  return (
    <>
      {book ? (
        <div>
          <Link to={`/book/${book.id}`}>Discard</Link>

          {status === "success" && (
            <p role="status" className="form-feedback form-feedback--success">
              Book saved successfully.
            </p>
          )}
          {status === "error" && state.saveError && (
            <p role="alert" className="form-feedback form-feedback--error">
              {state.saveError}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="book-detail-split">
              <div className="book-detail-cover">
                {fields.coverUrl && <img src={fields.coverUrl} alt="" />}
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
                        onChange={set("title")}
                        aria-describedby={
                          errors.title ? "err-title" : undefined
                        }
                        aria-invalid={!!errors.title}
                        disabled={isBusy}
                      />
                      {errors.title && (
                        <span
                          id="err-title"
                          role="alert"
                          className="field-error"
                        >
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
                        onChange={set("author")}
                        aria-describedby={
                          errors.author ? "err-author" : undefined
                        }
                        aria-invalid={!!errors.author}
                        disabled={isBusy}
                      />
                      {errors.author && (
                        <span
                          id="err-author"
                          role="alert"
                          className="field-error"
                        >
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
                        onChange={set("isbn")}
                        aria-describedby={errors.isbn ? "err-isbn" : undefined}
                        aria-invalid={!!errors.isbn}
                        disabled={isBusy}
                        placeholder="Optional"
                      />
                      {errors.isbn && (
                        <span
                          id="err-isbn"
                          role="alert"
                          className="field-error"
                        >
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
                        onChange={set("publishedDate")}
                        aria-describedby={
                          errors.publishedDate ? "err-published" : undefined
                        }
                        aria-invalid={!!errors.publishedDate}
                        disabled={isBusy}
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
                      <label htmlFor="edit-cover-url">Cover URL</label>
                      <input
                        id="edit-cover-url"
                        type="url"
                        value={fields.coverUrl}
                        onChange={set("coverUrl")}
                        aria-describedby={
                          errors.coverUrl ? "err-cover-url" : undefined
                        }
                        aria-invalid={!!errors.coverUrl}
                        disabled={isBusy}
                        placeholder="Optional"
                      />
                      {errors.coverUrl && (
                        <span
                          id="err-cover-url"
                          role="alert"
                          className="field-error"
                        >
                          {errors.coverUrl}
                        </span>
                      )}
                    </div>

                    {/* placeholder */}
                    <div>
                      <label>Genre(s)</label>
                      <p className="field-placeholder">
                        [Genre multi-select — to be implemented]
                      </p>
                    </div>
                  </div>

                  {/* placeholder */}
                  {book.kind === "series" && (
                    <div className="book-detail-group">
                      <div>
                        <label>Series</label>
                        <p className="field-placeholder">
                          [Series editor — to be implemented]
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="book-detail-group">
                    <div>
                      <label htmlFor="edit-ownership-kind">Ownership</label>
                      <select
                        id="edit-ownership-kind"
                        value={fields.ownershipKind}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_OWNERSHIP_KIND",
                            kind: e.target.value as FormOwnershipKind,
                          })
                        }
                        disabled={isBusy}
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
                          onChange={set("ownershipPlatform")}
                          aria-describedby={
                            errors.ownershipPlatform
                              ? "err-platform"
                              : undefined
                          }
                          aria-invalid={!!errors.ownershipPlatform}
                          disabled={isBusy}
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
                        onChange={set("notes")}
                        disabled={isBusy}
                        rows={4}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>

                <div className="book-detail-actions">
                  <button type="submit" disabled={isBusy}>
                    {isBusy ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      dispatch({ type: "RESET", fields: initialFields })
                    }
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="page-title">
          <h1>Home Library Catalog</h1>
        </div>
      )}
    </>
  );
}

export default EditBookDetail;
