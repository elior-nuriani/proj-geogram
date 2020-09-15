const express = require('express');
const router = express.Router();
const {getPosts , getPost , addPost , updatePost} = require('./posts.controller');
// const { requireAuth } = require('../../middlewares/requireAuth.middleware');

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/',getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/', updatePost);

module.exports = router;
