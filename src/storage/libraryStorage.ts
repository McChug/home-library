import { LIBRARY_KEY } from "../constants";
import { LibrarySchema, type Library } from "../schemas/library.schema";

export function saveLibrary(library: Library): void {
  try {
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  } catch (err) {
    console.error("Failed to save library to localStorage", err);
  }
}

export function loadLibrary(): Library | null {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    const result = LibrarySchema.safeParse(parsed);

    if (!result.success) {
      console.error("Invalid library data", result.error.message);
      //   localStorage.removeItem(LIBRARY_KEY); // deletion logic for testing
      return null;
    }

    return result.data;
  } catch (err) {
    console.error("Failed to load library", err);
    return null;
  }
}
