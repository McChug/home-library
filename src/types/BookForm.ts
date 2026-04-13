// I used Claude to help architect my EditBookDetail component and these
// types are adapted from its output

export type FormOwnershipKind = "unowned" | "physical" | "digital";

export interface BookFormFields {
  title: string;
  author: string;
  isbn: string;
  coverUrl: string;
  publishedDate: string;
  ownershipKind: FormOwnershipKind;
  ownershipPlatform: string;
  notes: string;
  // genreIds to be implemented
  // series fields to be implemented
}

export interface BookFormErrors {
  title?: string;
  author?: string;
  isbn?: string;
  coverUrl?: string;
  publishedDate?: string;
  ownershipPlatform?: string;
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
  | { type: "SET_OWNERSHIP_KIND"; kind: FormOwnershipKind }
  | { type: "SUBMIT" }
  | { type: "SAVE_SUCCESS" }
  | { type: "SAVE_ERROR"; message: string };
