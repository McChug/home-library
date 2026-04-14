export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

export type FetchAction<T> =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; data: T }
  | { type: "LOAD_ERROR"; message: string };

export type FetchError =
  | { kind: "network"; message: string }
  | { kind: "http"; status: number; statusText: string }
  | { kind: "parse"; message: string }
  | { kind: "schema"; message: string }
  | { kind: "aborted" };

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: FetchError };
