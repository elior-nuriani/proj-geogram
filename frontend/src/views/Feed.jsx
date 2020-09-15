import React, { Component } from 'react';
import PostListFeed from '../components/PostListFeed';
import Sort from '../components/Sort';
import { connect } from 'react-redux';
import { updateUserAlertMsg } from '../actions/usersActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import UnreadMsgs from '../components/UnreadMsgs';
import utilService from '../services/utilService';
import MainSpinner from '../components/MainSpinner';

import StoryList from '../components/StoryList';


class Feed extends Component {
    state = {
        feedFilterBy: '',
        maxPostsPerPage: 15,
        currPage: 1,
        isShowInfiniteSpinner: false
    }

    componentDidMount() {
        // this.handleInfiniteScroll()
    }

    setFeedFilterBy = (e) => {
        const { value } = e.target;
        this.setState({
            feedFilterBy: value
        })
    }

    playAllStories() {
        const { updateUserAlertMsg } = this.props;
        utilService.setAlertMessage('Feature is not available for now ...', updateUserAlertMsg)
    }

    handleInfiniteScroll() {
        const { maxPostsPerPage } = this.state;
        const { posts } = this.props;
        const pageCount = Math.ceil(posts.length / maxPostsPerPage);

        var observer = new IntersectionObserver(entries => {
            entries.forEach(async (entry) => {
                if (
                    entry.intersectionRatio > 0 &&
                    this.state.currPage < pageCount
                ) {
                    await this.setState((prevState) => {
                        return {
                            isShowInfiniteSpinner: true,
                            currPage: prevState.currPage + 1
                        }
                    })
                    await setTimeout(async () => {
                        this.setState(() => {
                            return {
                                isShowInfiniteSpinner: false
                            }
                        })
                    }, 2000);
                }
            });
        });
        observer.observe(document.querySelector(".infiniteScrollTrigger"));
    }

    render() {
        const { posts, loggedInUser, users, sortBy } = this.props;
        const { feedFilterBy, isShowInfiniteSpinner, maxPostsPerPage, currPage } = this.state;
        const regex = new RegExp(`${feedFilterBy}`, 'ig');
        
        let isShowNoFollowMsg = false;
        let postsByFollow = posts.filter((post) => {
            return loggedInUser.follow.includes(post.createdById);
        })

        if (!postsByFollow.length) {
            isShowNoFollowMsg = true;
            postsByFollow = posts.slice();
        }

        let postsToShow = postsByFollow.filter((post) => {
            return (regex.test(post.where) ||
                regex.test(post.country) ||
                regex.test(post.city) ||
                regex.test(post.title) ||
                regex.test(post.desc))
        })

        postsToShow = utilService.setSortBy(postsToShow, sortBy).slice(0, maxPostsPerPage * currPage);

        var msgs = [];
        for (let chatMemeber in loggedInUser.chats) {
            msgs = [...msgs, ...loggedInUser.chats[chatMemeber].msgs];
        }
        const elNoFollowMsg = (isShowNoFollowMsg) ? (<h5>* No Following List ... Random Posts Are Showen </h5>) : null;
        const elSpinner = (isShowInfiniteSpinner) ? (<MainSpinner />) : null;

        return (
            <div className="feed-container flex column feed-container">
                <div className="feed-header-container flex row space-between">
                    <div className="input-container flex row center space-between">
                        <span className="search-icon">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input value={feedFilterBy} onChange={(e) => { this.setFeedFilterBy(e) }} className="search" type="text" placeholder="Search"></input>
                    </div>
                    <div className="loggedInUser-action-box btn flex row center">
                        <div onClick={() => { this.props.history.push('/chat') }} className="msg-alert flex row center">
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <UnreadMsgs type="MULTI" id={loggedInUser._id} msgs={msgs} />
                        </div>
                        <div onClick={() => { this.props.history.push("/post/create") }} className="btn btn-add-post flex row center">
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add Post</span>
                        </div>
                    </div>
                </div>
                <div className="story-header-container flex row center space-between">
                    <h3>Story</h3>
                    <h5  onClick={() => { this.playAllStories() }}  className="flex row center btn">
                        <span className="flex row center">
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                        <span className="watch-all-title">Watch All</span>
                    </h5>
                </div>
                <StoryList loggedInUser={loggedInUser} users={users} />
                <div className="posts-container ">
                    <div className="header-container flex row center space-between">
                        <h2>Feed</h2>
                        <Sort />
                    </div>
                    {elNoFollowMsg}
                    <PostListFeed postsToShow={postsToShow} />
                    {/* <div className="infiniteScrollTrigger"></div>
                    {elSpinner} */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { loggedInUser, users } = state.user;
    const { posts, sortBy } = state.post;
    return {
        posts,
        loggedInUser,
        users,
        sortBy
    }
}

const mapDispatchToProps = {
    updateUserAlertMsg
}


export default connect(mapStateToProps,mapDispatchToProps)(Feed);