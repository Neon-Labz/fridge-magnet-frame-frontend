const rawBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

const BACKEND_ORIGIN = rawBackendUrl
  .replace(/\/$/, '')
  .replace(/\/api\/v1$/, '');

export const apiV1Url = (path: string) =>
  `${BACKEND_ORIGIN}/api/v1/${path.replace(/^\//, '')}`;
