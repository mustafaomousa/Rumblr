const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
// const { where } = require('sequelize/types');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { Post, User, Like, sequelize } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

const router = express.Router();
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { limit } = req.query;
    const posts = await Post.findAll({
      include: [
        User,
        Like,
        {
          model: Like,
          where: { userId: req.user.id },
          required: false,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
    });
    return res.json(posts);
  })
);

router.get(
  "/random",
  requireAuth,
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
  requireAuth,
  asyncHandler(async (req, res) => {
    const { content, body, tags, userId } = req.body;

    const post = await Post.create({
      content,
      body,
      userId: req.user.id,
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
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { postId, body } = req.body;
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: [
        User,
        { model: Like, where: { userId: req.user.id }, required: false },
      ],
    });

    if (updatedPost.userId !== req.user.id) {
      const err = new Error("This post does not belong to the current user.");
      err.status = 401;
      err.title = "Update failed";
      err.errors = ["This post does not belong to the current user."];
      return next(err);
    }

    updatedPost.update({ body: body });
    updatedPost.save();
    return res.json({ updatedPost });
  })
);

router.delete(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { postId } = req.body;

    const post = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (post.userId !== req.user.id) {
      const err = new Error("This post does not belong to the current user.");
      err.status = 401;
      err.title = "Delete failed";
      err.errors = ["This post does not belong to the current user."];
      return next(err);
    } else {
      post.destroy();
      return res.json({ deleted: true });
    }
  })
);

module.exports = router;
