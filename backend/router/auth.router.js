const express = require("express");
const {
  signUp,
  signIn,
  updatePermission,
} = require("../controllers/auth.controllers");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.put("/updatePermission", updatePermission);

module.exports = authRouter;
