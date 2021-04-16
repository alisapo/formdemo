const
  namePattern = /^[a-z_]{4,}$/,
  passPattern = /^[\S]{6,}$/;

export const dataValidation = (name, value) => {
  let msg = null;

  try {
    switch (name) {
      case "username":
        if (!value || !namePattern.test(value)) msg = "Please enter a valid name";
        break;
      case "password":
        if (!value || !passPattern.test(value)) msg = "Password must contain at least 6 symbols";
        break;
      default:
        break;
    }
    return msg;
  } catch (error) {
    console.log(error);
  }
};
