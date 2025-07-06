const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
