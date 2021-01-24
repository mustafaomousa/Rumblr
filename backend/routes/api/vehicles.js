const express = require('express');
const asyncHandler = require('express-async-handler');

const { Make, Model } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {

    const makes = await Make.findAll({ include: [{ model: Model }] });
    const models = await Model.findAll();

    return res.json({ makes, models });

}));

// router.post('/', asyncHandler(async (req, res) => {


// }));

module.exports = router;