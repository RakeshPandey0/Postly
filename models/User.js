const { randomBytes, createHmac } = require("crypto");
const { Schema, model } = require("mongoose");
const {createUserToken} = require("../services/authentication")
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.password = hashedPassword;
  this.salt = salt;

  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User Not Found!");

  const hashSalt = user.salt;
  const hashedPassword = user.password;

  const hashedPasswordToCompare = createHmac("sha256", hashSalt)
    .update(password)
    .digest("hex");

  if (hashedPasswordToCompare !== hashedPassword)
    throw new Error("Password Incorrect!");

  const token = createUserToken(user);
  return token;
});

const User = model("user", userSchema);

module.exports = User;
