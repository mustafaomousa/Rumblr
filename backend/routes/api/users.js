const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('header')
        .exists({ checkFalsy: true })
        .isLength({ min: 0 })
        .withMessage('Please provide a header with at least 1 character.'),
    check('bio')
        .exists({ checkFalsy: true })
        .isLength({ min: 10 })
        .withMessage('Please provide a bio with at least 10 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

router.get('/', asyncHandler(async (req, res) => {
    const users = await User.findAll();

    return res.json({ users })
}));

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, header, bio, profilePicture, username } = req.body;
    const user = await User.signup({ username, email, header, bio, profilePicture, password });

    await setTokenCookie(res, user);

    return res.json({ user });
}));

module.exports = router;