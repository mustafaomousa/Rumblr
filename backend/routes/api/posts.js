const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post, User, Make, Model, Tag, TagJoin } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {

    const posts = await Post.findAll({ include: [{ model: User }, { model: Make }, { model: Model }], order: [['updatedAt', 'DESC']] });
    return res.json({ posts });

}));

router.post('/', asyncHandler(async (req, res) => {

    const { title, content, body, tags, makeId, modelId, userId } = req.body;

    const newPost = await Post.create({ title, content, body, makeId, modelId, userId });


    for (tag in tags) {
        const dbTag = await Tag.findOne({ where: { name: tag } });
        if (!dbTag) {
            const newTag = await Tag.create({ tag });
            const tagId = newTag.id;
            const postId = newPost.id;
            const newPostTag = await TagJoin.create({ tagId, postId });
        } else {
            const tagId = dbTag.id;
            const postId = newPost.id;
            const newPostTag = await TagJoin.create({ tagId, postid })
        }
    }

    return res.json({ newPost });

}));

module.exports = router;