import type { BookFormState, BookFormAction } from "@/types/bookForm";
import type { AsyncState, FetchAction } from "@/types/fetch";
import { validate } from "./helpers";

function assertNever(x: never): never {
  throw new Error(`Unexpected case: ${JSON.stringify(x)}`);
}

export function fetchReducer<T>(
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

export function formReducer(
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
    case "ADD_READTHROUGH":
      return {
        ...state,
        status: "editing",
        fields: {
          ...state.fields,
          readthroughs: [
            ...state.fields.readthroughs,
            { finishedAt: "", rating: "", notes: "" },
          ],
        },
      };
    case "REMOVE_READTHROUGH":
      return {
        ...state,
        status: "editing",
        fields: {
          ...state.fields,
          readthroughs: state.fields.readthroughs.filter(
            (_, i) => i !== action.index,
          ),
        },
        errors: {
          ...state.errors,
          readthroughs: state.errors.readthroughs?.filter(
            (_, i) => i !== action.index,
          ),
        },
      };
    case "SET_READTHROUGH_FIELD":
      return {
        ...state,
        status: "editing",
        fields: {
          ...state.fields,
          readthroughs: state.fields.readthroughs.map((r, i) =>
            i === action.index ? { ...r, [action.field]: action.value } : r,
          ),
        },
        errors: {
          ...state.errors,
          readthroughs: state.errors.readthroughs?.map((e, i) =>
            i === action.index ? "" : e,
          ),
        },
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
