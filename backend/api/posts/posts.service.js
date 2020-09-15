const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    getById,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('posts');
    try {
        const posts = await collection.find().toArray();
        return posts;
    }
    catch (err) {
        _setError('query',err)
    }
}

async function getById(id) {
    const collection = await dbService.getCollection('posts');
    try {
        const post = await collection.findOne({ "_id": ObjectId(id) });
        return post;
    }
    catch (err) {
        _setError('getById',err)
    }
}

async function add(post) {
    const collection = await dbService.getCollection('posts');
    try {
        const newPost = await collection.insertOne(post);
        return newPost.ops[0];
    }
    catch (err) {
        _setError('add',err)
    }

}

async function update(post) {
    const collection = await dbService.getCollection('posts');
    post._id = ObjectId(post._id);
    try {
        await collection.updateOne({ "_id": post._id }, {$set:post });
        return post;
    }
    catch (err) {
        _setError('update',err)
    }
}

async function _setError(funcName, err) {
    console.log(`Error at Posts, ${funcName} function ${err}`);
    throw err;
}