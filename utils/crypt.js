import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (plainPswd, encrPswd) => {
  return bcrypt.compare(plainPswd, encrPswd);
};
