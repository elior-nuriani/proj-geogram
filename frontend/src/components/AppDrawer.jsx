import React from 'react';
import UserStats from './UserStats';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faComment} from '@fortawesome/free-regular-svg-icons';
import { faHome, faSearch, faCompass, faBell, faPaperPlane, faPlus, faEllipsisV, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import userService from '../services/userService';
import { setLoggedInUser } from '../actions/usersActions';

function AppDrawer({ loggedInUser, history, setLoggedInUser }) {

    async function handleLogout() {
        console.log('LogOut!')
        // userService.logout();
        // setLoggedInUser(null);
        // history.push('/')
    };

    async function goToUserProfile(){
        history.push(`/user/details/posts/${loggedInUser._id}`)
    }

    return (
        <div className="drawer-container flex column">
            <div className="logo-box flex row center justify-start">
                <div className="logo-title">Geogram</div>
            </div>
            <div className="drawer-profile-info flex column center">
                <div onClick={() => {goToUserProfile()}}  className="profile-img btn flex column center">
                    <div className="img-wrapper flex column center">
                        <div className="img" style={{ backgroundImage: `url(${loggedInUser.imgUrl})` }} >
                        </div>
                    </div>
                </div>
                <div className="profile-name-box">
                    <div className="profile-fullName">{loggedInUser.firstName} {loggedInUser.lastName}</div>
                    <div className="profile-userName">{loggedInUser.userName}</div>
                </div>
                <UserStats user={loggedInUser} />

            </div>
            <div className="drawer-navbar flex column align-start space-between">
                <div className="flex column">
                    <span className="link-box flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faHome}></FontAwesomeIcon>
                        <NavLink exact to="/feed">Feed</NavLink>
                    </span>
                    <span className="link-box flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faSearch}></FontAwesomeIcon>
                        <NavLink to="/discover">Discover</NavLink>
                    </span>
                    <span className="link-box flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faCompass}></FontAwesomeIcon>
                        <NavLink to="/locations">My Locations</NavLink>
                    </span>
                    {/* <span className="link-box flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faBell}></FontAwesomeIcon>
                        <NavLink to="/notifications">Notifications</NavLink>
                    </span> */}
                    <span className="link-box flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faPaperPlane}></FontAwesomeIcon>
                        <NavLink to="/chat">Messages</NavLink>
                    </span>
                    {/* <span className="link-box flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faEllipsisV}></FontAwesomeIcon>
                        <NavLink to="/settings">Settings</NavLink>
                    </span> */}
                    <span onClick={() => { handleLogout() }} className="link-box btn-logout-wrapper  flex row center justify-start">
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt}></FontAwesomeIcon>
                        <span className="logout-btn">Logout</span>
                    </span>

                </div>
                <span onClick={() => { history.push("/post/create") }} className="btn btn-add-post flex row center">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Create Post</span>
                </span>

            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    const { loggedInUser } = state.user;
    const { posts } = state.post;
    return {
        loggedInUser,
        posts
    }
}

const mapDispatchToProps = {
    setLoggedInUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppDrawer))