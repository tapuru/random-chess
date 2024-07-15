import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiErrorResponse {
  status: number;
  data: { message: string };
}

export function isApiError(error: unknown): error is ApiErrorResponse {
  return typeof error === "object" && error != null && "status" in error;
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}
