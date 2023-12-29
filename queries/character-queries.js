const dal = require('../database/dal');

// Get all characters from mySql database
async function getAllcharacters() {
    const sql = `SELECT * from characters`;
    const characters = await dal.executeAsync(sql);
    return characters;
}

// Get data for one charachter mySql the database using params
async function getOnecharacter(id) {
    const sql = `SELECT * from characters WHERE characterID = ${id}`;
    const character = await dal.executeAsync(sql);
    return character;
}

//Create connection in the connection table for user to "follow" charachter
async function followcharacter(data) {
    const sql = `INSERT INTO savedcharacters(userID,characterID)
    VALUES(${data.userID} ,${data.characterID})`;
    const followed = await dal.executeAsync(sql);
    return followed.affectedRows;
}

//Get all the followed charachers for a user, using his/her id
async function getFollowedcharacters(userID) {
    const sql = `SELECT characterID FROM savedcharacters 
    where ${userID} = userID`;
    const characters = await dal.executeAsync(sql);
    return characters;
}

//Delete a follow connection between user and charachter
async function deleteFollowedcharacter(userID, characterID) {
    const sql = `DELETE FROM savedcharacters WHERE userID = ${userID} and characterID = ${characterID}`;
    await dal.executeAsync(sql);
}



//Add a new character  
async function addNewcharacter(character) {
    const sql = `INSERT INTO characters(firstName,lastName,strength)
    VALUES('${character.firstName}','${character.lastName}',
   ${character.strength})`;
    const info = await dal.executeAsync(sql);
    character.characterID = info.insertId;
    return character;
}


//Delete a character 
async function deletecharacter(id) {
    const sql = `DELETE FROM characters WHERE characterID = ${id}`;
    await dal.executeAsync(sql);
}


//Update a charachter

async function updatecharacter(character) {
    const sql = `
        UPDATE characters SET
        firstName = '${character.firstName}',
        lastName = '${character.lastName}',
        strength = ${character.strength}
        WHERE characterID = ${character.characterID}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : character;
}

//Get all followed chrachters
async function getAllFollowedcharacters() {
    const sql = 'SELECT * FROM savedcharacters';
    const characters = await dal.executeAsync(sql);
    return characters;
}


module.exports = {
    getAllcharacters,
    followcharacter,
    getFollowedcharacters,
    deleteFollowedcharacter,
    addNewcharacter,
    deletecharacter,
    getOnecharacter,
    updatecharacter,
    getAllFollowedcharacters
}