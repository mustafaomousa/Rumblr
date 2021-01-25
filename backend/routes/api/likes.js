const express = require('express');
const asyncHandler = require('express-async-handler');
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const { Like } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const likes = await Like.findAll();
    res.json({ likes });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { userId, postId } = req.body;
    const newLike = await Like.create({ userId, postId });
    res.json({ newLike });
}));

module.exports = router;