import User from "../models/userModel.js";
import { comparePassword, generateToken } from "../utils/crypt.js";
import { appLogger } from "../utils/logger.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ message: "User Created Successfully!", success: true, data: savedUser });
  } catch (err) {
    if (err.message.includes("E11000")) {
      res.status(400).json({ success: false, message: "Email Already Exists!" });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    appLogger.info("Inside Login Controller");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user?._id && user?.isActive && user?.isEmailVerified) {
      const isPswdValid = await comparePassword(password, user.password);
      if (isPswdValid) {
        let token = generateToken({ _id: user?._id, email: user?.email, name: user?.fullName, mobile: user?.phone, role: user?.role });
        let response = {
          success: true,
          message: "Login Successfull!",
          data: {
            _id: user._id,
            fullName: user?.fullName,
            mobile: user?.phone,
            countryCode: user?.countryCode,
            email: user?.email,
            token,
          },
        };
        res.status(200).json(response);
      } else {
        res.status(400).json({ message: "Invalid Email/Password!", success: false });
      }
    } else if (!user?.isActive || !user?.isEmailVerified) {
      res.status(400).json({
        success: false,
        message: !user?.isEmailVerified ? "Please verify your email!" : "User is Blocked. Contact Admin!",
        isEmailVerified: user?.isEmailVerified,
        isActive: user?.isActive,
      });
    } else {
      res.status(400).json({ message: "Invalid Email/Password!", success: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Encryption - Decryption
// Base64
// hashing
