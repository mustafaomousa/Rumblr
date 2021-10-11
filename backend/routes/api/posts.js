const express = require("express");
const asyncHandler = require("express-async-handler");
// const { where } = require('sequelize/types');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {
  Post,
  User,
  Tag,
  TagJoin,
  RerumbleJoin,
  Like,
} = require("../../db/models");

const router = express.Router();
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { limit, userId } = req.query;
    const posts = await Post.findAll({
      include: [User, Tag, Like],
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

    for (let tag in tags) {
      const dbTag = await Tag.findOne({ where: { name: tags[tag] } });
      if (!dbTag) {
        const newTag = await Tag.create({ name: tags[tag] });
        const tagId = newTag.dataValues.id;
        const newPostTag = await TagJoin.create({ tagId, postId });
        newPostTag.save();
      } else {
        const tagId = dbTag.dataValues.id;
        const newPostTag = await TagJoin.create({ tagId, postId });
        newPostTag.save();
      }
    }

    const newPost = await Post.findByPk(postId, { include: [User, Tag, Like] });

    return res.json({ newPost });
  })
);

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { tags, postId, title, body } = req.body;
    const updatedPost = await Post.findOne({ where: { id: postId } });
    await TagJoin.destroy({ where: { postId: postId } });

    for (let tag in tags) {
      const dbTag = await Tag.findOne({ where: { name: tags[tag] } });
      if (!dbTag) {
        const newTag = await Tag.create({ name: tags[tag] });
        const tagId = newTag.dataValues.id;
        const newPostTag = await TagJoin.create({ tagId, postId });
        newPostTag.save();
      } else {
        const tagId = dbTag.dataValues.id;
        const newPostTag = await TagJoin.create({ tagId, postId });
        newPostTag.save();
      }
    }

    updatedPost.update({ title: title, body: body });
    updatedPost.save();
    return res.json({ updatedPost });
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { postId } = req.body;
    Like.destroy({
      where: {
        postId,
      },
    });

    TagJoin.destroy({
      where: {
        postId,
      },
    });

    Post.destroy({
      where: {
        id: postId,
      },
    });

    return res.json({ deleted: true });
  })
);

router.post(
  "/:postId/like",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    const newLike = await Like.create({
      postId,
      userId,
    });
    return res.json({ newLike });
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await Tag.findAll();

    return res.json({ tags });
  })
);

module.exports = router;
