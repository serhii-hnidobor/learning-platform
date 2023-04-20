export default async function fetchFunction(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const response = (await fetch(input, init)) as unknown as Response;

  if (!response.ok) {
    throw {
      message: response.statusText,
      code: response.status,
    };
  }

  return response;
}
