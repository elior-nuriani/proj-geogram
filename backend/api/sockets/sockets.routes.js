//client === socket


module.exports = (io) => {
    io.on('connection', (client) => {

        //Creating a List of sockets id's with their username [{socketId : username},{socketId : username}, ...]
        //now we can get all the sockets/client connected and choose the right socekt by the username .
        // ** For Checking if the user is connected to the app , and manage sending messages while the user is 
        //    not at the room! **

        client.on('setUserNameToSocket', ({ userName, id }) => {
            console.log(userName, client.id)
            io.sockets.sockets[client.id] = {
                userName,
                id
            };
        })


        client.on('setChannel', (channelName) => {
            if (client.channel) {
                client.leave(client.channel)
                io.sockets.sockets[client.id].channel = '';
            }
            client.join(channelName);
            client.channel = channelName;
            io.sockets.sockets[client.id].channel = channelName;
        })
        // console.log(userTargetSocket[1], userTargetSocket[1].channel , channelName)

        client.on('updateUserTarget', ({ userTargetId, userSenderId, channelName }) => {

            //List Of all sockets connected to the app --- an array of array with :
            // * id * username * channel connected  based on the socket id
            const socketsList = Object.entries(io.sockets.sockets);
            const userTargetSocket = socketsList.find((userTarget) => {
                return userTarget[1].id === userTargetId;
            })
            //If the target user is connected to the app  >>> FRIEND REQUEST
            if (userTargetSocket) {
                //For The User Target
                io.to(userTargetSocket[0]).emit('setUserTarget', { userSenderId, channelName })
            }

        })

        client.on('updatePosts', (post) =>{
            client.broadcast.emit('updatePostsBySocket', post);
        })

        client.on('updateUsers', (user) =>{
            client.broadcast.emit('updateUsersBySocket', user);
        })
        client.on('addPost' ,(post) =>{
            client.broadcast.emit('addPostBySocket', post)
        })


        client.on('sendNewMsg', ({ msg, channelName, to }) => {

            //List Of all sockets connected to the app --- an array of array with :
            // * id * username * channel connected  based on the socket id
            const socketsList = Object.entries(io.sockets.sockets);
            const userTargetSocket = socketsList.find((userTarget) => {
                return userTarget[1].id === to;
            })


            //If the target user is connected to the app  >>> SEND MSG
            if (userTargetSocket) {
                //For The User Target
                io.to(userTargetSocket[0]).emit('addMsg', { msg, channelName })
                //For myself
                client.emit('addMsg', { msg, channelName })
            }



            // if(userTargetSocket && userTargetSocket[1].channel && userTargetSocket[1].channel === channelName){
            //     console.log('User is connected to the chat room')
            // } else if(!userTargetSocket){
            //     //Update only the database
            //     console.log('User is not connected to the app !')
            // }else if ( userTargetSocket[1].channel !== channelName ){
            //     //Update the user only by his socket id !
            //         console.log('User is connected to the app but is not at the chat room')
            // }


            // io.to(client.channel).emit('addMsg', { msg, channelName })
        })

        // const userName = 'podo'
        // // Get All The sockets / clients connected
        // console.log(io.sockets.sockets)
        // const x = Object.value(io.sockets.sockets);
        // console.log(x)
    })
}