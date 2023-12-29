const express = require('express');
const router = express.Router();
const sighUpQuery = require('../queries/sign-up-queries');

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        console.log(user)
        const newUser = await sighUpQuery.addUser(user);
        if (newUser === 0) {
            // res.status(400).json({ error: "User name already exists" });

        }
        if (newUser === 1) {

            throw "Something is missing";
        }
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;