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
export enum ApiErrors {
  UNEXPECTED = "unexpected-error",

  // auth related errors ---
  PERMISSION_DENIED = "permission-denied",
  EMAIL_EXISTS = "email-exists",
  USERNAME_EXISTS = "username-exists",
  PASSWORD_MISMATCH = "password-mismatch",
  UNAUTHORIZED = "unauthorized",
  INCORRECT_CREDENTIALS = "incorrect-credentials",

  //profile related errors ---
  PROFILE_NOT_FOUND = "profile-not-found",
  PROFILE_ALREADY_IN_GAME = "profile-already-in-game",
  PROFILE_IS_NOT_IN_GAME = "profile-is-not-in-game",

  //game related errors ---
  GAME_NOT_FOUND = "game-not-found",
  GAME_ALREADY_STARTED = "game-already-started",
  GAME_FULL = "game-full",
  GAME_NOT_FINISHED = "game-not-finished",
  GAME_NOT_ACTIVE = "game-not-active",
  INVALID_MOVE = "invalid-move",
  GAME_HAS_NO_REMATCH_DATA = "game-has-no-rematch-data",
}

export const apiErrorSchema = z.nativeEnum(ApiErrors);
