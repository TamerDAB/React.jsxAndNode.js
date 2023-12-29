const express = require('express');
const router = express.Router();
const LoginQuery = require('../queries/login-queries');

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const userLogin = await LoginQuery.login(user);
        if (userLogin === 0) {
            throw "User name / Password is wrong";
        }
        res.status(201).json(userLogin);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;