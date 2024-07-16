export enum AppErrors {
  // auth related errors ---
  PERMISSION_DENIED = 'permission-denied',
  EMAIL_EXISTS = 'email-exists',
  USERNAME_EXISTS = 'username-exists',
  PASSWORD_MISMATCH = 'password-mismatch',
  UNAUTHORIZED = 'unauthorized',
  INCORRECT_CREDENTIALS = 'incorrect-credentials',

  //profile related errors ---
  PROFILE_NOT_FOUND = 'profile-not-found',
  PROFILE_ALREADY_IN_GAME = 'profile-already-in-game',
  PROFILE_IS_NOT_IN_GAME = 'profile-is-not-in-game',

  //game related errors ---
  GAME_NOT_FOUND = 'game-not-found',
  GAME_ALREADY_STARTED = 'game-already-started',
  GAME_FULL = 'game-full',
  GAME_NOT_FINISHED = 'game-not-finished',
  GAME_NOT_ACTIVE = 'game-not-active',
  INVALID_MOVE = 'invalid-move',
  GAME_HAS_NO_REMATCH_DATA = 'game-has-no-rematch-data',
}
