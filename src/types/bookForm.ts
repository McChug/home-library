// I used Claude to help architect my EditBookDetail component and these
// types are adapted from its output

export type FormOwnershipKind =
  | "unowned"
  | "hardcover"
  | "paperback"
  | "digital";

export interface BookFormFields {
  title: string;
  author: string;
  isbn: string;
  coverImage: File | null;
  coverPreviewUrl: string | null;
  publishedDate: string;
  ownershipKind: FormOwnershipKind;
  ownershipPlatform: string;
  notes: string;
  genreIds: string[];
  seriesId: string;
  seriesOrder: string;
  seriesNewName: string;
  readthroughs: ReadthroughForm[];
}

export interface ReadthroughForm {
  finishedAt: string;
  rating: string;
  notes: string;
}

export interface BookFormErrors {
  title?: string;
  author?: string;
  isbn?: string;
  coverImage?: string;
  publishedDate?: string;
  ownershipPlatform?: string;
  genreIds?: string;
  seriesId?: string;
  seriesOrder?: string;
  seriesNewName?: string;
  readthroughs?: string[];
}

export type BookFormStatus = "editing" | "saving" | "success" | "error";

export interface BookFormState {
  status: BookFormStatus;
  fields: BookFormFields;
  errors: BookFormErrors;
  saveError?: string;
}

export type BookFormAction =
  | { type: "SET_FIELD"; field: keyof BookFormFields; value: string }
  | { type: "SET_GENRES"; value: string[] }
  | { type: "SET_OWNERSHIP_KIND"; kind: FormOwnershipKind }
  | { type: "SET_COVER_IMAGE"; file: File | null; previewUrl: string | null }
  | { type: "ADD_READTHROUGH" }
  | { type: "REMOVE_READTHROUGH"; index: number }
  | {
      type: "SET_READTHROUGH_FIELD";
      index: number;
      field: keyof ReadthroughForm;
      value: string;
    }
  | { type: "POPULATE_FROM_FETCH"; payload: Partial<BookFormFields> }
  | { type: "SUBMIT" }
  | { type: "SAVE_SUCCESS" }
  | { type: "SAVE_ERROR"; message: string };
