import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { updateUsers } from '../actions/usersActions';
import { connect } from 'react-redux';
import socketService from '../services/socketService';

function PostHeader({ postCreator, post, history, loggedInUser, updateUsers }) {
    function moveToProfilePage(e, id) {
        e.stopPropagation();
        e.preventDefault();
        history.push(`/user/details/posts/${id}`)
    }

    function followMemeber(e, id) {
        e.stopPropagation();
        e.preventDefault();
        const user = Object.assign({}, loggedInUser);
        if (id !== user._id) {
            if (user.follow.length && user.follow.includes(id) && id !== user._id) {
                const idx = user.follow.findIndex((followId) => {
                    return followId === id;
                })
                user.follow.splice(idx, 1);
            } else user.follow.push(id);
            updateUsers(user);
            socketService.emit('updateUsers', user)
        }
    }

    const follow = (loggedInUser.follow.includes(postCreator._id)) ? 'Unfollow' : 'Follow'

    return (
        <div className="flex row center justify-start">
            <div onClick={(e) => { moveToProfilePage(e, postCreator._id) }} className="post-user-img btn" style={{ backgroundImage: `url(${postCreator.imgUrl})` }}></div>
            <div className="post-info flex column center align-start">
                <div className="flex row center justify-start">
                    <div className="creator-userName userName btn" onClick={(e) => { moveToProfilePage(e, postCreator._id) }}>{postCreator.userName}</div>
                    <span className="follow-tag" onClick={(e) => { followMemeber(e, postCreator._id) }}>
                        • {follow}
                    </span>
                </div>
                <div className="post-where">{post.where}</div>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => {
    const { loggedInUser } = state.user;
    return {
        loggedInUser
    }
}

const mapDispatchToProps = {
    updateUsers
}




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostHeader));