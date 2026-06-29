export function logError(message: string, error?: unknown): void {
  if (process.env.NODE_ENV !== "production") {
    if (error !== undefined) {
      console.error(message, error);
    } else {
      console.error(message);
    }
  } else {
    console.error(message);
  }
}
