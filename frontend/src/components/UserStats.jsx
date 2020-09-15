import React from 'react';
import { connect } from 'react-redux'

function UserStats({ user, posts, users }) {
    const follow = (user.follow) ? user.follow.length : 0;
    const postsCreatedByUser = (posts.length)? posts.filter((currPost) => {
        return currPost.createdById === user._id
    }).length : 0;


    const followers = (users.length) ? users.filter((currUser) => {
        return  currUser.follow && currUser.follow.includes(user._id)
    }).length : 0;

    return (
        <div className="profile-info-box flex row center space-between">
            <div className="profile-posts flex column center">
                <span>{postsCreatedByUser}</span>
                <span>Posts</span>
            </div>
            <div className="profile-follow flex column center">
                <span>{followers}</span>
                <span>Followers</span>
            </div>
            <div className="profile-following flex column center">
                <span>{follow}</span>
                <span>Following</span>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const { users } = state.user;
    const { posts } = state.post;
    return {
        posts,
        users
    }
}


export default connect(mapStateToProps)(UserStats)