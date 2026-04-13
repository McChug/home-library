import React, { useReducer } from "react";
import { bookToFields, validate } from "../helpers/EditBookDetailHelpers";
import type {
  BookFormAction,
  BookFormFields,
  BookFormState,
  FormOwnershipKind,
} from "../types/BookForm";
import type { EditBookDetailProps } from "../types/EditBookDetailProps";
import { Link } from "react-router";

function assertNever(x: never): never {
  throw new Error(`Unexpected case: ${JSON.stringify(x)}`);
}

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
    default:
      return assertNever(action as never);
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
  const isSaving = status === "saving";

  function setField(field: keyof BookFormFields) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => dispatch({ type: "SET_FIELD", field, value: e.target.value });
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
  }

  return (
    <>
      <div>
        {book ? (
          <Link to={`/book/${book.id}`}>Cancel</Link>
        ) : (
          <Link to={"/"}>Cancel</Link>
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
                    <label htmlFor="edit-cover-url">Cover URL</label>
                    <input
                      id="edit-cover-url"
                      type="url"
                      value={fields.coverUrl}
                      onChange={setField("coverUrl")}
                      disabled={isSaving}
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
                {book && book.kind === "series" ? (
                  <div className="book-detail-group">
                    <div>
                      <label>Series</label>
                      <p className="field-placeholder">
                        [Series editor — to be implemented]
                      </p>
                    </div>
                  </div>
                ) : (
                  <p>Add series</p>
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
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditBookDetail;
