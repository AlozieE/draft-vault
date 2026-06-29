export function getShareBaseUrl(): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (typeof window !== "undefined" ? window.location.origin : "");

  return baseUrl.replace(/\/$/, "");
}

export function buildShareUrl(token: string): string {
  return `${getShareBaseUrl()}/share/${token}`;
}
