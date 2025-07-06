const { Router } = require("express");
const router = Router();

const {
  handleSignup,
  handleSignin,
} = require("../controllers/user.controller");

router.post("/signup", handleSignup);

router.post("/signin", handleSignin);

module.exports = router;
