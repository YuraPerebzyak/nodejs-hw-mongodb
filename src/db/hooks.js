export const handleSaveError = (error, doc, next) => {
  error.status = 400;
  next();
};

export const setUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidator = true;
  next();
};
