const parsNumber = (number, defaultValue) => {
  if (typeof number !== 'string') return defaultValue;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsNumber)) return defaultValue;

  return parsedNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parsNumber(page, 1);
  const parsedPerPage = parsNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
