const mysql = require('mysql');

// Creating connction object with parameters
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'game-hero'
});

// Running connection
connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected to mySql DB: game-hero');
});


// Execute queries 
function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql ,(err , result) => {
            if(err){
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
}