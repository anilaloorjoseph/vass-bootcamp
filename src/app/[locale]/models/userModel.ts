import mongoose from "mongoose";
import { type UserData } from "../types/typescript";

const userSchema = new mongoose.Schema<UserData>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  roles: {
    type: [String],
    required: false,
    default: ["user"],
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Group",
  },
});

const User = mongoose.models.User ?? mongoose.model("User", userSchema);

export default User;
