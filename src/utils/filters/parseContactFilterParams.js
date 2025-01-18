const parseContactType = (string) => {
  if (typeof string !== 'string') return;

  const validTypes = ['home', 'personal'];

  if (validTypes.includes(string.toLowerCase())) {
    return string.toLowerCase();
  }

  return;
};

const parseContactIsFavorite = (value) => {
  if (typeof value !== 'string') return;

  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  return;
};

export const parseContactFilterParams = ({ type, isFavourite }) => {
  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseContactIsFavorite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
