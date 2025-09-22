import mongoose from "mongoose";
import { hashPassword } from "../utils/crypt.js";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number },
    countryCode: { type: String },
    isActive: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

export default mongoose.model("users", userSchema);
