import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import PostHeader from '../components/PostHeader';
import PostIcons from '../components/PostIcons'
import { updatePosts } from '../actions/postActions';
import socketService from '../services/socketService';


class PostDetails extends Component {
    state = {
        comment: '',
        idx: null
    }
    moveToProfilePage = (id) => {
        this.props.history.push(`/user/details/posts/${id}`)
    }

    handleSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    inputFocusOut = () => {
        this.setState({
            idx: null
        })
    }

    updateComment = (e) => {
        const { value } = e.target;
        this.setState({
            comment: value
        })
    }

    replayToComment = (id) => {
        this.setState({
            idx: id
        })
        document.querySelector('.comment-input').focus();
    }

    sendComment() {
        const { comment, idx } = this.state;
        const { post, loggedInUser, updatePosts} = this.props;
        const currPost = Object.assign({}, post);
        const newComment = {
            byUserId: loggedInUser._id,
            byUserImgUrl: loggedInUser.imgUrl,
            byUserName: loggedInUser.userName,
            txt: comment,
            feedbacks: []
        }
        if (!idx && idx !== 0) currPost.comments.push(newComment);
        else {
            currPost.comments[idx].feedbacks.push(newComment);
        }
        updatePosts(currPost);
        socketService.emit('updatePosts', currPost);
    }   


    render() {
        const { post, users, loggedInUser } = this.props;
        const postCreator = users.find((currPost) => {
            return currPost._id === post.createdById
        })
        const elComments = post.comments.map((comment, idx) => {
            const elFeedBacks = (comment.feedbacks) ?
                comment.feedbacks.map((feedback, idx) => {
                    return (<div key={idx} className="comment-feedback flex row align-start justify-start ">
                        <div onClick={() => { this.moveToProfilePage(feedback.byUserId) }} className="post-user-img btn" style={{ backgroundImage: `url(${feedback.byUserImgUrl})` }}></div>
                        <div className="flex column center align-start">
                            <div>
                                <span className="userName btn" onClick={() => { this.moveToProfilePage(feedback.byUserId) }}>{feedback.byUserName}</span>
                                {feedback.txt}
                            </div>
                            <div onClick={() => { this.replayToComment(idx) }} className="comment-reply-box flex row center justify-start">
                                <span>123w</span>
                                <span >Replay</span>
                            </div>
                        </div>
                    </div>)
                })
                : null;


            return (
                <div key={idx} className="comment">
                    <div className="flex row align-start justify-start">
                        <div onClick={() => { this.moveToProfilePage(comment.byUserId) }} className="post-user-img btn" style={{ backgroundImage: `url(${comment.byUserImgUrl})` }}></div>
                        <div className="flex column center align-start">
                            <div>
                                <span className="userName btn" onClick={() => { this.moveToProfilePage(comment.byUserId) }}>{comment.byUserName}</span>
                                {comment.txt}
                            </div>
                            <div onClick={() => { this.replayToComment(idx) }} className="comment-reply-box flex row center justify-start" className="comment-reply-box flex row center justify-start">
                                <span>123w</span>
                                <span>Replay</span>
                            </div>
                        </div>
                    </div>

                    {elFeedBacks}
                </div>
            )
        })
        const elCommentInput = (loggedInUser) ? (
            <form onSubmit={(e) => { this.handleSubmit(e) }} className="input-container flex row center space-between">
                <input onBlur={() => this.inputFocusOut()} value={this.state.comment} onChange={(e) => { this.updateComment(e) }} className="comment-input" type="text" placeholder="Share your thoughts"></input>
                <button onClick={() => { this.sendComment() }} className="btn btn-comment flex row center">Comment</button>
            </form>
        ) : (<div className="input-comment-msg">
            Please Log In to like and comment
        </div>)

        const formattedLikes = new Intl.NumberFormat().format(post.likes);

        return (
            <div className="post-details-wrapper flex row center">
                <div className="post-details-container flex row center">
                    <div className="post-img" style={{ backgroundImage: `url(${post.imgs[0]})` }}></div>
                    <div className="post-comments flex column center justify-start">
                        <div className="post-header creator-container flex row center space-between">
                            <PostHeader postCreator={postCreator} post={post} />
                            <span className="opt-icon btn">
                                <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                            </span>
                        </div>
                        <div className="comments-container">
                            {elComments}
                        </div>
                        {/* Base Style */}
                        <div className="action-container flex column">
                            <PostIcons post={post} />
                            <div className="likes-wrapper">
                                {formattedLikes} likes
                            </div>
                            <div className="date-wrapper">
                                DECEMBER 20, 2017
                            </div>
                            <div className="input-wrapper flex row center justify-start">
                                {elCommentInput}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const post = state.post.posts.find((post) => {
        return post._id === ownProps.match.params.id
    })
    const { users, loggedInUser } = state.user;
    return {
        post,
        users,
        loggedInUser
    }
}

const mapDispatchToProps = {
    updatePosts
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails);