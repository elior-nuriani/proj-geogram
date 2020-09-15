const userService = require('./users.service');



async function getUsers(req, res) {
    const users = await userService.query();
    res.send(users);
}

async function getUser(req, res) {
    const id = req.params.id;
    const user = await userService.getById(id);
    res.send(user);
}

async function addUser(req, res) {
    const user = req.body;
    const newUser = await userService.add(user);
    res.send(newUser);
}

async function updateUser(req, res) {
    const user = req.body;
    const updatedUser = await userService.update(user);
    res.send(updatedUser)
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser
}