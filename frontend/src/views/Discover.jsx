import React, { Component } from 'react';
import Sort from '../components/Sort';
import { connect } from 'react-redux';
import PostList from '../components/PostList';
import utilService from '../services/utilService';
import MainSpinner from '../components/MainSpinner';


class Discover extends Component {
    render() {
        const { posts, sortBy } = this.props;
        let postsToShow = posts.slice();

        postsToShow = utilService.setSortBy(postsToShow, sortBy);

        return (
            <div className="flex column discover-container">
                <div className="discover-header flex row center space-between">
                    <h2>Discover</h2>
                    <Sort />
                </div>
                <div className="discover-main">
                    <PostList postsToShow={postsToShow} />
                    {/* <MainSpinner /> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { sortBy, posts } = state.post;
    return {
        sortBy,
        posts
    }
}

export default connect(mapStateToProps)(Discover)
