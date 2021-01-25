const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Post, User, Make, Model } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {

    const posts = await Post.findAll({ include: [{ model: User }, { model: Make }, { model: Model }], order: [['updatedAt', 'DESC']] });
    return res.json({ posts });

}));

router.post('/', asyncHandler(async (req, res) => {

    const { title, content, body, makeId, modelId, userId } = req.body;

    const newPost = await Post.create({ title, content, body, makeId, modelId, userId });

    return res.json({ newPost });

}));

module.exports = router;