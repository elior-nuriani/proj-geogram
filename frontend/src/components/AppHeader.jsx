import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane, faCompass } from '@fortawesome/free-regular-svg-icons';
import { faHome, faCamera, faSearch, faBell, faPlusCircle, faEllipsisV, faSignOutAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import UnreadMsgs from '../components/UnreadMsgs';

export const AppTopHeader = ({ loggedInUser }) => {

    var msgs = [];
    for (let chatMemeber in loggedInUser.chats) {
        msgs = [...msgs, ...loggedInUser.chats[chatMemeber].msgs];
    }

    return (
        <div className="app-top-header-container flex row space-between">
            <NavLink className="link-box flex row center justify-start" to="">
                <FontAwesomeIcon className="icon" icon={faCamera}></FontAwesomeIcon>
            </NavLink>
            <h2 className="geogram-logo flex row center">Geogram <span>.</span></h2>
            <NavLink className="link-box msg-alert flex row center justify-start" to="/chat">
                <FontAwesomeIcon className="icon" icon={faPaperPlane}></FontAwesomeIcon>
                <UnreadMsgs type="MULTI" id={loggedInUser._id} msgs={msgs} />
            </NavLink>
        </div>
    )
}

const AppBottomHeaderWithoutRouter = ({ loggedInUser, isShowLoggedInUserProfileImg , history }) => {

    function toggleOutputSection() {
        const elChatOutput = document.querySelector('.chat-output');
        if (elChatOutput) elChatOutput.classList.toggle('close');
    }

    function goToProfile(id) {
        history.push(`/user/details/posts/${id}`)
    }

    const elDynamicNavLink = (isShowLoggedInUserProfileImg) ? (<div onClick={() => { goToProfile(loggedInUser._id) }} className="logged-in-user-link" style={{ backgroundImage: `url(${loggedInUser.imgUrl})` }}>

    </div>) : <div onClick={() => { toggleOutputSection() }} className="link-box chat-arrow flex row center justify-start">
            <FontAwesomeIcon className="icon" icon={faLongArrowAltRight}></FontAwesomeIcon>
        </div>
    return (
        <div className="app-bottom-header-container flex row center space-between">
            <NavLink className="link-box flex row center justify-start" to="/feed">
                <FontAwesomeIcon className="icon" icon={faHome}></FontAwesomeIcon>
            </NavLink>
            <NavLink className="link-box flex row center justify-start" to="/discover">
                <FontAwesomeIcon className="icon" icon={faSearch}></FontAwesomeIcon>
            </NavLink>
            <NavLink className="link-box flex row center justify-start" to="/post/create">
                <span className="add-post flex row center">
                    <FontAwesomeIcon className="icon" icon={faPlusCircle}></FontAwesomeIcon>
                </span>
            </NavLink>
            <NavLink className="link-box flex row center justify-start" to="/locations">
                <FontAwesomeIcon className="icon" icon={faCompass}></FontAwesomeIcon>
            </NavLink>
            {elDynamicNavLink}
        </div>
    )
}

export const AppBottomHeader = withRouter(AppBottomHeaderWithoutRouter);
