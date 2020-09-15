import React, { Component } from 'react';
import { AppTopHeader, AppBottomHeader } from './components/AppHeader';
import AppDrawer from './components/AppDrawer';
import { Route, Switch } from 'react-router-dom';
import Feed from './views/Feed';
import Discover from './views/Discover';
import Notifications from './views/Notifications';
import Chat from './views/Chat';
import PostDetails from './views/PostDetails';
import UserLocations from './views/UserLocations';
import Settings from './views/settings';
import Login from './views/Login';
import Sigunp from './views/Signup';
import UserProfile from './views/UserProfile';
import CreatePost from './views/CreatePost';
import { connect } from 'react-redux';
import { loadPosts, updatePosts, addPost } from './actions/postActions';
import { loadUsers, updateUsers } from './actions/usersActions';
import socketService from './services/socketService';
import utilService from './services/utilService';
import AlertMsg from './components/AlertMsg';



class App extends Component {
  constructor() {
    super();
  }

  //Like Created In Vue 
  async componentWillMount() {
    socketService.setup();
    const { loggedInUser } = this.props;

    if (loggedInUser) {
      const { userName, _id } = loggedInUser;
      socketService.emit('setUserNameToSocket', { userName, id: _id })
    }

  }

  async componentDidMount() {
    socketService.on('addMsg', this.addMsg);
    socketService.on('setUserTarget', this.setUserTarget);
    socketService.on('updatePostsBySocket', this.updatePostsBySocket);
    socketService.on('updateUsersBySocket', this.updateUsersBySocket);
    socketService.on('addPostBySocket', this.addPostBySocket)



    const { users, posts } = this.props;



    //Create Request each refresh
    if (!users.length && !posts.length) {
      await this.props.loadPosts();
      await this.props.loadUsers();
    }

  }

  updatePostsBySocket = (post) => {
    const { updatePosts } = this.props;
    updatePosts(post);
  }

  updateUsersBySocket = (user) => {
    const { updateUsers, users } = this.props;
    updateUsers(user, false);
  }

  addPostBySocket = (post) => {
    const { addPost } = this.props;
    console.log(post)
    addPost(post)
  }

  setUserTarget = ({ userSenderId, channelName }) => {
    const { loggedInUser, updateUsers } = this.props;
    const user = Object.assign({}, loggedInUser);
    user.chats[userSenderId] = {
      channelName,
      msgs: []
    }
    updateUsers(user);
  }


  addMsg = async ({ msg, channelName }) => {
    //Update The Users in Reducer and not the loggedInuser
    //LoggedInUser will update because of this change .... we dont need to update loggedinuser directly
    const { loggedInUser, updateUsers } = this.props;
    const user = Object.assign({}, loggedInUser);

    for (let userId in user.chats) {
      if (user.chats[userId].channelName === channelName) {
        msg.isRead = (msg.from === loggedInUser._id) ? true : false;
        user.chats[userId].msgs.push(msg);
        await updateUsers(user);
        console.log('updated!')
      }
    }

  }



  render() {
    const { loggedInUser, isShowLoggedInUserProfileImg } = this.props
    const elDrawer = (loggedInUser) ? <AppDrawer loggedInUser={loggedInUser} /> : null
    const elAppBottomHeader = (loggedInUser) ?
      <AppBottomHeader loggedInUser={loggedInUser} isShowLoggedInUserProfileImg={isShowLoggedInUserProfileImg} />
      : null
    const elAppTopHeader = (loggedInUser) ?
      <AppTopHeader loggedInUser={loggedInUser} /> : null
    return (
      <div className="App flex row">
        {elAppTopHeader}
        {elAppBottomHeader}
        {elDrawer}
        <AlertMsg />
        <div className="main-content-wrapper flex column">
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/signup" component={Sigunp}></Route>
            <Route exact path="/feed" component={Feed}></Route>
            <Route exact path="/discover" component={Discover}></Route>
            <Route exact path="/locations" component={UserLocations}></Route>
            <Route exact path="/notifications" component={Notifications}></Route>
            <Route exact path="/post/create" component={CreatePost}></Route>
            <Route exact path="/chat" component={Chat}></Route>
            <Route exact path="/settings" component={Settings}></Route>
            <Route exact path="/user/details/posts/:id" component={UserProfile}></Route>
            <Route exact path="/user/details/follow/:id" component={UserProfile}></Route>
            <Route exact path="/post/details/:id" component={PostDetails}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  const { posts } = state.post;
  const { users, loggedInUser, isShowLoggedInUserProfileImg } = state.user;
  return {
    posts,
    users,
    loggedInUser,
    isShowLoggedInUserProfileImg
  }
}

const mapDispatchToProps = {
  loadPosts,
  loadUsers,
  updateUsers,
  updatePosts,
  addPost
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
