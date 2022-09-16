import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hash password before (pre) saving to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = model("user", userSchema);

export default User;
