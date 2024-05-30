import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.static("login", function (email, password) {
  if (!validator.isEmail(email)) {
    return Promise.reject(new Error("Email is invalid"));
  }

  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("User not found"));
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return Promise.reject(new Error("Password is invalid"));
    }
    return Promise.resolve(user);
  });
});

UserSchema.static("register", function (email, password) {
  if (!validator.isEmail(email)) {
    return Promise.reject(new Error("Email is invalid"));
  }

  return this.create({ email, password }).then((user) => {
    return Promise.resolve(user);
  });
});

export default mongoose.model("User", UserSchema);
