const userService = require('../users/users.service');
const bcrypt = require('bcryptjs');

module.exports = {
    login,
    signup
}

async function login(userName, password) {
    if (!userName || !password) return Promise.reject('Missing Required Fields');
    const user = await userService.getByUsername(userName);
    if (!user) return Promise.reject('Username is not exist');
    const isMatch = (user.isDefaultUser) ? user.password === password : await bcrypt.compare(password, user.password);
    if (!isMatch) return Promise.reject('Password is invalid');
    const userCred = Object.assign({}, user);
    delete userCred.password;
    return userCred;
}


async function signup(userCred) {
    const salt = await bcrypt.genSalt(10);
    userCred.password = await bcrypt.hash(userCred.password, salt);
    const user = await userService.add(userCred);
    return user;
}
