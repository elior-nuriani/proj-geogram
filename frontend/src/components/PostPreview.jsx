import React from 'react';
import PostBasePreview from './PostBasePreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import {faHeart, faComment} from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'


function PostPreview({ post, users, history }) {
    function moveToProfilePage(e,id){
        e.stopPropagation();
        e.preventDefault();
        history.push(`/user/details/posts/${id}`)
    }


    function getCommentCount(comments) {
        let count = 0;
        for (let comment of comments) {
            count += (comment['feedbacks']) ? comment['feedbacks'].length : 0;
        }
        return (count + comments.length)
    }

    //Includes Img and Layer on Top
    const postImg = (
        <PostBasePreview post={post} />
    )
    const postCreator = users.find((user) => { return user._id === post.createdById });

    const elPostCreator = (postCreator) ? (
        <div className="creator-container flex row center btn" onClick={(e) =>{moveToProfilePage(e,postCreator._id)}}>
            <div className="post-user-img" style={{ backgroundImage: `url(${postCreator.imgUrl})` }}></div>
            <div className="creator-userName">{postCreator.userName}</div>
        </div>

    ) : null;

    const formattedLikes = (post.likes > 1000) ? (post.likes / 1000).toFixed(1) + 'k' : post.likes;
    const formattedComments = (post.comments.length > 1000 )? (post.comments.likes / 1000).toFixed(1) + 'k' : getCommentCount(post.comments); 

    return (
        <div className="post-preview-container">
            {postImg}
            <div className="post-details flex row center space-between">
                {elPostCreator}
                <div className="post-main-details flex row center">
                    <div className="likes-box">
                        <span>
                            <FontAwesomeIcon icon= {faHeart}></FontAwesomeIcon>
                        </span>
                        <span>
                            {formattedLikes}
                        </span>
                    </div>
                    <div className="comment-box">
                        <span>
                            <FontAwesomeIcon icon= {faComment}></FontAwesomeIcon>
                        </span>
                        <span>
                            {formattedComments}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    const { users } = state.user;
    return {
        users
    }
}

export default connect(mapStateToProps)(withRouter(PostPreview))