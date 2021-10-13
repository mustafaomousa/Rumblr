const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
// const { where } = require('sequelize/types');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post, User } = require("../../db/models");

const router = express.Router();
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { limit } = req.query;
    const posts = await Post.findAll({
      include: [User],
      order: [["createdAt", "DESC"]],
      limit,
    });

    return res.json({ posts });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { content, body, tags, userId } = req.body;

    const post = await Post.create({
      content,
      body,
      userId,
    });

    const postId = post.dataValues.id;

    const newPost = await Post.findByPk(postId, { include: [User] });

    return res.json({ newPost });
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { postId, body } = req.body;
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: "User",
    });

    updatedPost.update({ body: body });
    updatedPost.save();
    return res.json({ updatedPost });
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { postId } = req.body;

    Post.destroy({
      where: {
        id: postId,
      },
    });

    return res.json({ deleted: true });
  })
);

module.exports = router;
