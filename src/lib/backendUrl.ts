export const apiV1Url = (path: string) =>
  `/api/v1/${path.replace(/^\//, '')}`;
