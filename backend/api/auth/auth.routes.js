const express = require('express');
const router = express.Router();
const {doLogin, doSignup, doLogout} = require('./auth.controller');

router.post('/login', doLogin);
router.post('/signup',doSignup);
router.post('/logout',doLogout);

module.exports = router;