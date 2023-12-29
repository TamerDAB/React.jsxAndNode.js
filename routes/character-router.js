const express = require('express');
const router = express.Router();
const characterQuery = require('../queries/character-queries');

// Get all characters from mySql database
router.get('/', async (req, res) => {
    try {
        const characters = await characterQuery.getAllcharacters();
        res.json(characters);
    } catch (error) {
        res.status(500).send(error);
    }
});


// Get data for one charachter mySql the database using params
router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const character = await characterQuery.getOnecharacter(id);
        res.json(character[0]);
    } catch (error) {
        res.status(500).send(error);

    }
});

//Create connection in the connection table for user to "follow" charachter
router.post('/followcharacter', async (req, res) => {
    try {
        const info = req.body;
        const sendInfo = await characterQuery.followcharacter(info);
        res.json(sendInfo);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get all the followed charachers for a user, using his/her id
router.get('/get-followed-characters/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const characters = await characterQuery.getFollowedcharacters(id);
        res.json(characters);
    } catch (error) {
        res.status(500).send(error);
    }
});

// remove followed character
router.delete('/delete/:userID/:characterID', async (req, res) => {
    try {
        const userID = +req.params.userID;
        const characterID = +req.params.characterID;
        await characterQuery.deleteFollowedcharacter(userID, characterID);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error);

    }
});

//Add a new character 
router.post('/new-character', async (req, res) => {
    try {
        const character = req.body;
        const newcharacter = await characterQuery.addNewcharacter(character);
        res.status(201).json(newcharacter);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Delete a character 
router.delete('/delete-character', async (req, res) => {
    try {
        const character = req.body;
        await characterQuery.deletecharacter(character.characterID);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error);
    }
});


//Update a charachter
router.put('/update-character', async (req, res) => {
    try {
        const character = req.body;
        const updatedcharacter = await characterQuery.updatecharacter(character);
        res.json(updatedcharacter);

        if (updatedcharacter === null) {
            res.sendStatus(404);
            return;
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

//Get all followed chrachters
router.get('/followed/get-all', async (req, res) => {
    try {
        const characters = await characterQuery.getAllFollowedcharacters();
        res.json(characters);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;