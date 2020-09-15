const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    getByUsername,
    add,
    update
}

async function query() {
    const collection = await dbService.getCollection('users');
    try {
        const users = await collection.find().toArray();
        return users;
    }
    catch (err) {
        _setError('query', err)
    }
}

async function getById(id) {
    const collection = await dbService.getCollection('users');
    try {
        const user = await collection.findOne({ "_id": ObjectId(id) })
        return user;
    }
    catch (err) {
        _setError('getById', err)
    }
}

async function getByUsername(userName) {
    const collection = await dbService.getCollection('users');
    try {
        const user = await collection.findOne({ "userName": userName })
        return user;
    }
    catch (err) {
        _setError('getByUsername', err)
    }
}


async function add(user) {
    const collection = await dbService.getCollection('users');
    try {
        const newUser = await collection.insertOne(user);
        return newUser.ops[0];
    }
    catch (err) {
        _setError('user', err)
    }
}

async function update(user) {
    const collection = await dbService.getCollection('users');
    user._id = ObjectId(user._id);
    try {
        await collection.updateOne({ "_id": user._id }, { $set: user });
        return user;
    }
    catch (err) {
        _setError('user', err)
    }
}


async function _setError(funcName, err) {
    console.log(`Error at Users, ${funcName} function ${err}`);
    throw err;
}