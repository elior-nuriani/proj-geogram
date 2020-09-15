const authService = require('./auth.service');
const { use } = require('./auth.routes');
const DEFAULT_USER_AVATAR = 'https://cdn.pixabay.com/photo/2018/11/13/22/01/instagram-3814081_960_720.png';

module.exports = {
    doLogin,
    doLogout,
    doSignup
}

async function doLogin(req, res) {
    const { userName, password } = req.body;
    try {
        const user = await authService.login(userName, password);
        if(user) req.session.user = user;
        res.send(user);
    }
    catch (err) {
        res.status(500).send({ err })
    }
}

async function doSignup(req, res) {
    const user = req.body;
    try {
        //Default User Proprties
        user.imgUrl = `${DEFAULT_USER_AVATAR}`;
        user.county = '';
        user.city = '';
        user.age = '';
        user.follow = [];
        user.favPosts = [];
        user.savedLocations = [];
        user.chats = [];
        user.storiesUrl = [];

        const newUser = await authService.signup(user);
        res.send(newUser);
    }
    catch (err) {
        res.status(500).send({ err })
    }
}


async function doLogout(req, res) {
    try {
        req.session.distroy();
        res.send();
    }
    catch (err) {
        res.status(500).send({ err })
    }
}