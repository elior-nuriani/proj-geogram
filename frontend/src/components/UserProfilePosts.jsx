import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostBasePreview from './PostBasePreview';

class UserProfilePosts extends Component {
    moveToPost = (id) => {
        console.log(this);
        this.props.history.push(`/post/details/${id}`)
    }
    render() {
        const { user, posts, userProfileFilterBy } = this.props;
        const regex = new RegExp(`${userProfileFilterBy}`, "ig");

        const postsToShow = posts.filter((post) => {
            return (post.createdById === user._id && (
                regex.test(post.where) ||
                regex.test(post.country) ||
                regex.test(post.city) ||
                regex.test(post.title) ||
                regex.test(post.desc)
            ))
        })
        const elPosts = (postsToShow.length)? postsToShow.map((post) => {
            //The post Preview itself
            return (
                <div key={post._id} onClick={() => { this.moveToPost(post._id) }}>
                    <PostBasePreview post={post} />
                </div>
            )
        }) : (<div className="profile-default-msg" >No Posts Created</div>)
        return (
            <div className="user-profile-post-gallery" >
                {elPosts}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { posts } = state.post;
    const { id } = ownProps.match.params;
    const { users, userProfileFilterBy } = state.user;

    const user = users.find((currUser) => {
        return currUser._id === id;
    })

    return {
        user,
        posts,
        userProfileFilterBy
    }
}

export default connect(mapStateToProps)(UserProfilePosts)