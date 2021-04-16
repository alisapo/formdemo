export const validateForm = (form, errors, validFunc) => {
  const errObj = {};

  Object.keys(errors).map((item) => {
    const msg = validFunc(item, form[item]);

    if (msg) errObj[item] = msg;
  });

  return errObj;
};
