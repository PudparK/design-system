export const IS_PROD =
  typeof process !== "undefined" &&
  process.env &&
  process.env.NODE_ENV === "production";

const rawDebugMode =
  typeof process !== "undefined" && process.env
    ? process.env.DEBUG_MODE ?? process.env.EXPO_PUBLIC_DEBUG_MODE
    : undefined;

export const DEBUG_MODE = `${rawDebugMode ?? ""}`.toLowerCase() === "true";
