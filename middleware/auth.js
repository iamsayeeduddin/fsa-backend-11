import { verifyToken } from "../utils/crypt.js";

export const isLoggedIn = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let isVerifiedToken = verifyToken(token);
      if (isVerifiedToken) {
        req.decodedToken = isVerifiedToken;
        next();
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.decodedToken) {
      let role = req.decodedToken.role;
      if (role === "ADMIN") {
        next();
      } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
      }
    }
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
