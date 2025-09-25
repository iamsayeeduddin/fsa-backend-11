import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (plainPswd, encrPswd) => {
  return bcrypt.compare(plainPswd, encrPswd);
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
