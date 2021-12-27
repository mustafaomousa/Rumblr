const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { Like } = require("../../db/models");
const { Op } = require("sequelize");

const router = express.Router();

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { postId, userId } = req.body;

    const possibleLike = await Like.findOne({
      where: { [Op.and]: { postId, userId } },
    });

    if (!possibleLike) {
      const like = await Like.create({
        postId,
        userId,
      });

      return res.json({ like });
    }
  })
);

router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { likeId } = req.body;
    const like = await Like.findByPk(likeId);
    await like.destroy();

    const newLikes = await Like.findAll({ where: { postId: like.postId } });
    return res.json({ newLikes });
  })
);

module.exports = router;
