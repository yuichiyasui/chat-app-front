async function wrappedFetch(
  path: string,
  option: RequestInit
): Promise<Response> {
  const ORIGIN = import.meta.env.VITE_API_ORIGIN;
  const CONTENT_TYPE = "application/json;charset=UTF-8";
  const response = await fetch(`${ORIGIN}${path}`, {
    headers: {
      "content-type": CONTENT_TYPE,
      ...option.headers,
    },
    ...option,
  });
  return response;
}

export default wrappedFetch;
