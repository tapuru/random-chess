import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { z } from "zod";

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

enum ApiErrors {
  PROFILE_NOT_FOUND = "profile-not-found",
  PROFILE_ALREADY_IN_GAME = "profile-already-in-game",
}

export const apiErrorSchema = z.nativeEnum(ApiErrors);
