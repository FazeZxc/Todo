import mongoose from "mongoose";

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false
    },
    email: {
      type: String,
      unique: true,
      requried: true,
    },
    password: {
      type: String,
      required: true,
      unique: false
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("Users", Userschema )