import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  name: String,
  email: String,
  googleId: String,
  password: String,
  age: Number
});

const User = mongoose.model("User", UserSchema);
export default User;
