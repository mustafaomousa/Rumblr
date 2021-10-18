const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Post } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

router.get(
  "/newest",
  asyncHandler(async (req, res) => {
    const newestUsers = await User.findAll({
      limit: 4,
      order: [["createdAt", "DESC"]],
    });
    return res.json({ newestUsers });
  })
);

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId, { include: Post });
    const posts = await Post.findAll({ where: { userId: userId } });
    return res.json({ user: { user, posts } });
  })
);

router.put(
  "/:userId/profile_picture",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { profilePicture } = req.body;
    const user = await User.findByPk(userId);
    user.profilePicture = profilePicture;
    await user.save();

    return res.json({ updatedUser: user });
  })
);

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({
      username,
      email,
      password,
    });

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

module.exports = router;
