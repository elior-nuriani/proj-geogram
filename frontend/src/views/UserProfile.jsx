import React, { Component } from 'react';
import UserStats from '../components/UserStats';
import UserProfilePosts from '../components/UserProfilePosts';
import UserProfileFollow from '../components/UserProfileFollow';
import { setUserProfileFilterBy, updateUsers } from '../actions/usersActions'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import utilService from '../services/utilService';
import socketService from '../services/socketService';

import { withRouter, NavLink, Route, Switch } from 'react-router-dom';

class UserProfile extends Component {
    state = {
        user: {}
    }
    componentDidMount() {
        const { users } = this.props;
        const { id } = this.props.match.params;
        const user = users.find((user) => {
            return user._id === id
        })
        this.setState({
            user
        })

    }

    setFilterBy = async (e) => {
        const { setUserProfileFilterBy } = this.props;
        const { value } = e.target;
        await setUserProfileFilterBy(value);
    }

    changeRouterView = (e, url) => {
        const current = document.querySelector('.active-section');
        current.classList.remove('active-section');
        e.target.classList.add('active-section')
        this.props.history.replace(url);
    }

    followMemeber = (id) => {
        const { loggedInUser, updateUsers } = this.props;
        const user = Object.assign({}, loggedInUser);
        if (!loggedInUser._id === id) {
            if (user.follow.length && user.follow.includes(id)) {
                const idx = user.follow.findIndex((followId) => {
                    return followId === id;
                })
                user.follow.splice(idx, 1);
            } else user.follow.push(id);
            updateUsers(user);
            socketService.emit('updateUsers', user)
        }
    }

    sendMsg = (id) => {
        const { loggedInUser, updateUsers } = this.props;
        if(!loggedInUser._id === id){
            if (loggedInUser.chats[id]) this.props.history.push('/chat');
            else {
                const rndChannelName = utilService.makeRndChannel();
                const user = Object.assign({}, loggedInUser);
                user.chats[id] = {
                    channelName: rndChannelName,
                    msgs: []
                }
                updateUsers(user);
                socketService.emit('updateUserTarget', { userTargetId: id, userSenderId: loggedInUser._id, channelName: rndChannelName });
                this.props.history.push('/chat');
            }
        }
    }



    render() {
        const { userProfileFilterBy, loggedInUser } = this.props;
        const { id } = this.props.match.params;
        const BASE_URL_POSTS = `user/details/posts/${id}`;
        const BASE_URL_FOLLOW = `user/details/follow/${id}`;
        const follow = (loggedInUser.follow.includes(id)) ? 'Unfollow' : 'Follow'
        return (
            <div className="user-profile-container flex column">
                <div className="input-container flex row center space-between">
                    <span className="search-icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input value={userProfileFilterBy} onChange={(e) => { this.setFilterBy(e) }} className="search" type="text" placeholder={`${this.state.user.userName} Posts`}></input>
                </div>
                <div className="user-profile-info flex row center align-start">
                    <div className="user-profile-img" style={{ backgroundImage: `url(${this.state.user.imgUrl})` }}></div>
                    <div className="user-profile-main-info">
                        <div className="user-profile-title flex row center">
                            <h2>{this.state.user.userName}</h2>
                            <div className="flex row center">
                                <div className="btn btn-follow" onClick={() => { this.followMemeber(this.state.user._id) }}>{follow}</div>
                                <div className="btn btn-msg" onClick={() => { this.sendMsg(this.state.user._id) }}>Message</div>
                            </div>
                        </div>
                        <UserStats user={this.state.user} />
                        <div className="user-profile-about">
                            <span>{this.state.user.about}</span>
                        </div>
                        <div className="user-profile-personal">
                            <span>{this.state.user.firstName} {this.state.user.lastName} , {this.state.user.age}</span>
                        </div>
                        <div className="user-profile-personal">
                            <span>{this.state.user.country} , {this.state.user.city}</span>
                        </div>
                    </div>
                </div>
                <div className="user-profile-routes flex column">
                    <div className="user-profile-routes-title flex row center">
                        <div className="btn routes-menu-btn active-section" onClick={(e) => { this.changeRouterView(e, `/${BASE_URL_POSTS}`) }} >Posts</div>
                        <div className="btn routes-menu-btn" onClick={(e) => { this.changeRouterView(e, `/${BASE_URL_FOLLOW}`) }}>Follow</div>
                    </div>
                    <Route exact path="/user/details/posts/:id" component={UserProfilePosts}></Route>
                    <Route exact path="/user/details/follow/:id" component={UserProfileFollow}></Route>
                </div>
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    const { users, userProfileFilterBy, loggedInUser } = state.user;
    return {
        users,
        userProfileFilterBy,
        loggedInUser
    }
}
const mapDispatchToProps = {
    setUserProfileFilterBy,
    updateUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));