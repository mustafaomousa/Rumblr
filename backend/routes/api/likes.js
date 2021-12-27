const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { Like } = require("../../db/models");

const router = express.Router();

router.post(
  "/",
  requireAuth,
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
  requireAuth,
  asyncHandler(async (req, res) => {
    const { likeId } = req.body;
    const like = await Like.findByPk(likeId);
    await like.destroy();

    return res.json({ like });
  })
);

module.exports = router;
