export const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  const response = {
    status,
    message: status === 409 ? 'ConflictError' : message,
    data: status === 409 ? { message: err.message } : {},
  };

  res.status(status).json(response);
};
