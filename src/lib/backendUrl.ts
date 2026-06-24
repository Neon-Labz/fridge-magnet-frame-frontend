/**
 * BUG FIX — ERR_CONNECTION_REFUSED on all client-side API calls
 *
 * Same root cause as api.ts: using an absolute "http://localhost:5000/api/v1"
 * base means browser requests bypass the Next.js proxy and hit port 5000
 * directly, failing with ERR_CONNECTION_REFUSED when the backend is slow.
 *
 * FIX: Return relative paths ("/api/v1/...") so every fetch from a Client
 * Component automatically goes through Next.js rewrites → backend.
 */
export const apiV1Url = (path: string) =>
  `/api/v1/${path.replace(/^\//, '')}`;
