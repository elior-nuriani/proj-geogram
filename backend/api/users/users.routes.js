const express = require('express');
const router = express.Router();
const { getUsers, getUser, addUser, updateUser } = require('./users.controller');
// const { requireAuth } = require('../../middlewares/requireAuth.middleware');

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/', updateUser)

module.exports = router