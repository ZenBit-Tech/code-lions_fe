const createNavigationLink = (
  base: string,
  queryParams: Record<string, string>
) => {
  const searchParams = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  return `${base}?${searchParams.toString()}`;
};

export default createNavigationLink;
