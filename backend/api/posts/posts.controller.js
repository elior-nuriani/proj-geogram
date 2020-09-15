const postService = require('./posts.service');

async function getPosts(req, res) {
    const posts = await postService.query();
    res.send(posts);
}


async function getPost(req, res) {
    const id =  req.params.id;
    const post = await postService.getById(id);
    res.send(post);
}


async function addPost(req, res) {
    const post = req.body;
    const newPost = await postService.add(post);
    res.send(newPost);
}


async function updatePost(req, res) {
    const post = req.body;
    const updatedPost = await postService.update(post);
    res.send(updatedPost)
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    updatePost
}