export const calcPaginationData = ({ totalItems, page, perPage }) => {
  const totalPage = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;

  return {
    page,
    perPage,
    totalPage,
    totalItems,
    hasNextPage,
    hasPrevPage,
  };
};
