const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
// const { where } = require('sequelize/types');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post, User, Like, sequelize } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

const router = express.Router();

router.post(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { postId, userId } = req.body;

    const like = await Like.create({
      postId,
      userId,
    });

    return res.json({ like });
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { likeId } = req.body;
    const like = await Like.findByPk(likeId);
    await like.destroy();

    return res.json({ like });
  })
);

module.exports = router;
