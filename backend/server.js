const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const io = require('socket.io')(http);

const postRoutes = require('./api/posts/posts.routes');
const userRoutes = require('./api/users/users.routes');
const authRoutes = require('./api/auth/auth.routes');
const connectSockets = require('./api/sockets/sockets.routes');

app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
connectSockets(io)



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
    console.log(`Listening on Port : ${PORT}`)
})