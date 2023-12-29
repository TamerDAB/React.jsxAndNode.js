const dal = require('../database/dal');

async function login(user) {
    console.log(user)
    const sql = `SELECT * from users WHERE userName = "${user.userName}" and password = "${user.password}"`;
    console.log(sql)
    const login = await dal.executeAsync(sql);
    if (login.length === 0) {
        return 0;
    }
    return login;
}

module.exports = {
    login
}