const jwt = require("jsonwebtoken");
require("dotenv").config();

function createUserToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.SECRET);
  return token;
}

function validateToken(token) {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    return payload;
  } catch (err) {
    return new Error(err);
  }
}

module.exports = {
  createUserToken,
  validateToken,
};
