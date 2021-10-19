async function wrappedFetch(
  path: string,
  option: RequestInit
): Promise<Response> {
  const ORIGIN = "http://localhost:3500";
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
