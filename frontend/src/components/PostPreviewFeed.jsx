import React, { useState } from 'react';
import { connect } from 'react-redux';
import PostHeader from './PostHeader';
import PostIcons from './PostIcons';
import { withRouter } from 'react-router-dom';
import { updatePosts } from '../actions/postActions';


function PostPreview({ post, users, loggedInUser, history, updatePosts }) {
    const [comment, setComment] = useState('');

    function moveToProfilePage(e, id) {
        e.stopPropagation();
        e.preventDefault();
        history.push(`user/details/posts/${id}`)
    }

    function handleFormClick(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function updateComment(e) {
        const { value } = e.target;
        setComment(value);
    }

    function sendComment() {
        if (comment) {
            const currPost = Object.assign({}, post);
            const newComment = {
                byUserId: loggedInUser._id,
                byUserImgUrl: loggedInUser.imgUrl,
                byUserName: loggedInUser.userName,
                txt: comment,
                feedbacks: []
            }
            currPost.comments.push(newComment);
            updatePosts(currPost)
            setComment('');
        }
    }

    function getCommentCount(comments) {
        let count = 0;
        for (let comment of comments) {
            count += (comment['feedbacks']) ? comment['feedbacks'].length : 0;
        }
        return (count + comments.length)
    }

    const postCreator = users.find((currPost) => {
        return currPost._id === post.createdById
    })

    const formattedLikes = new Intl.NumberFormat().format(post.likes);
    const formattedComments = (post.comments && post.comments.length > 1000) ? (post.comments.length / 1000).toFixed(1) + 'k' : getCommentCount(post.comments);
    return (
        <div className="post-preview-feed-container">
            <div className="post-header flex row center space-between">
                <PostHeader postCreator={postCreator} post={post} />
                <span onClick={(e) => { moveToProfilePage(e, postCreator._id) }} className="view-profile flex row center ">
                    View Profile
                </span>

            </div>
            <div className="post-img ratio-16-9" style={{ backgroundImage: `url(${post.imgs[0]})` }}></div>
            <div className="action-container">
                <PostIcons post={post} />
                <div className="likes-wrapper userName-wrapper flex column">
                    <span>
                        {formattedLikes} likes
                    </span>
                    <span >
                        {postCreator.userName}
                    </span>
                </div>
                <div className="date-wrapper">
                    DECEMBER 20, 2017
                </div>
                <div className="post-desc post-comments">
                    <div>{post.desc}</div>
                    <div>view all {formattedComments} comments</div>
                </div>
                <form onSubmit={(e) => { handleSubmit(e) }} onClick={(e) => { handleFormClick(e) }} className="add-comment flex row center">
                    <div className="post-user-img" style={{ backgroundImage: `url(${loggedInUser.imgUrl})` }}></div>
                    <input value={comment} onChange={(e) => { updateComment(e) }} type="text" placeholder="Add a comment ..."></input>
                    <button className="btn-comment" onClick={() => { sendComment() }}>Comment</button>
                </form>

            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const { users, loggedInUser } = state.user;
    return {
        users,
        loggedInUser
    }
}

const mapDispatchToProps = {
    updatePosts
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostPreview))