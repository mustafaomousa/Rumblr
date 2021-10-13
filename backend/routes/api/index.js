const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth.js");
const { User } = require("../../db/models");

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const postsRouter = require("./posts.js");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);

module.exports = router;
