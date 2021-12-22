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
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { limit } = req.query;
    const posts = await Post.findAll({
      include: [
        User,
        { model: Like, where: { userId: req.user.id }, required: false },
      ],
      order: [["createdAt", "DESC"]],
      limit,
    });

    return res.json({ posts });
  })
);

router.get(
  "/random",
  restoreUser,
  asyncHandler(async (req, res) => {
    const randomPost = await Post.findOne({
      order: sequelize.random(),
      include: [
        User,
        { model: Like, where: { userId: req.user.id }, required: false },
      ],
    });
    return res.json({ randomPost });
  })
);

router.post(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { content, body, tags, userId } = req.body;

    const post = await Post.create({
      content,
      body,
      userId,
    });

    const postId = post.dataValues.id;

    const newPost = await Post.findByPk(postId, {
      include: [
        User,
        { model: Like, where: { userId: req.user.id }, required: false },
      ],
    });

    return res.json({ newPost });
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { postId, body } = req.body;
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: [
        User,
        { model: Like, where: { userId: req.user.id }, required: false },
      ],
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
