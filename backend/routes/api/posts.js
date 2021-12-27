const express = require("express");
const asyncHandler = require("express-async-handler");
const { requireAuth } = require("../../utils/auth");
const { Post, User, Like } = require("../../db/models");
const db = require("../../db/models");
const { Op } = require("sequelize");

const arrangeLikes = async (req, posts) => {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let postJSON = post.toJSON();
    const userLike = await Like.findOne({
      where: { [Op.and]: [{ userId: req.user.id }, { postId: postJSON.id }] },
    });
    postJSON.Liked = userLike ? true : false;
    posts[i] = postJSON;
  }

  return posts;
};

const router = express.Router();
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { limit } = req.query;
    const posts = await Post.findAll({
      include: [Like, User],
      order: [["createdAt", "DESC"]],
      limit,
    });

    await arrangeLikes(req, posts);

    return res.json(posts);
  })
);

router.get(
  "/random",
  requireAuth,
  asyncHandler(async (req, res) => {
    const randomPost = await Post.findOne({
      order: db.sequelize.random(),
      include: [User, Like],
    });

    let posts = [randomPost];
    await arrangeLikes(req, posts);

    return res.json({ randomPost: posts[0] });
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
      include: [User, Like],
    });

    let posts = [newPost];
    await arrangeLikes(req, posts);

    return res.json({ newPost: posts[0] });
  })
);

router.put(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const { postId, body } = req.body;
    const updatedPost = await Post.findOne({
      where: { id: postId },
      include: [User, Like],
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

    let posts = [updatedPost];
    await arrangeLikes(req, posts);

    return res.json({ updatedPost: posts[0] });
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
