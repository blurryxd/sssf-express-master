'use strict';
const express = require('express');
const router = express.Router();
const catModel = require('../model/cats');

router.post('/', async (req, res) => {
    const post = await catModel.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight,
    });
    res.send(`cat created with id: ${post._id}`)
});


router.get('/', async (req, res) => {
    res.send(await catModel.find())
});


//>Respond to GET /cats with gender, age and weight query parameters with JSON containing the filtered list of cats.
// E.g. GET /cats?gender=male&weight=10&age=11 will return the male cats
// that have weight over 10kg and are older than 11 years.
// Didn't get this to work. This is the way I would've approached it adding more queries wtih '/:gender:weight:age'
router.get('/:gender', async (req, res) => {
    res.send(await catModel.find().where({gender: req.params.gender}))
});

module.exports = router;