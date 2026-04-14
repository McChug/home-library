import type { FetchError, Result } from "../types/fetch";

export async function fetchJsonUnkown(
  url: string,
  { signal }: { signal: AbortSignal },
): Promise<Result<unknown>> {
  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      return {
        ok: false,
        error: {
          kind: "http",
          status: response.status,
          statusText: response.statusText,
        },
      };
    }
    try {
      const data: unknown = await response.json();

      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: { kind: "parse", message: String(e) } };
    }
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      return { ok: false, error: { kind: "aborted" } };
    }
    return { ok: false, error: { kind: "network", message: String(e) } };
  }
}

export function formatFetchError(error: FetchError): string {
  switch (error.kind) {
    case "network":
      return `Network error: ${error.message}`;
    case "http":
      if (error.status === 404) {
        return "404: No book was found with the provided ISBN.";
      }
      if (!error.statusText) {
        return `HTTP ${error.status}`;
      }
      return `HTTP ${error.status}: ${error.statusText}`;
    case "parse":
      return `Failed to parse response: ${error.message}`;
    case "schema":
      return `Schema mismatch on response object: ${error.message}`;
    default:
      return "";
  }
}
