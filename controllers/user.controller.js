const User = require("../models/User");

const handleSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
};

const handleSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signin", {
      error: "Incorrect email or password.",
    });
  }
};

module.exports = {
  handleSignup,
  handleSignin,
};
