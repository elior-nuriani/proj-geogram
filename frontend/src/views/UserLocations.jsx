import React, { Component } from 'react';
import Map from '../components/Map';
import MapList from '../components/MapList';
import { connect } from 'react-redux';

class UserLocations extends Component {
    state = {
        filterBy: ''
    }

    setMapFilterBy = (filterBy) => {
        this.setState({
            filterBy
        })
    }

    componentDidMount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.add('wide');
    }
    render() {
        const { filterBy } = this.state;
        const regex = new RegExp(`${filterBy}`, "ig")
        const { posts, loggedInUser } = this.props;
        const postsList = loggedInUser.savedLocations.map((postId) => {
            return posts.find((post) => {
                return postId === post._id
            })
        })
        const postsListToShow = postsList.filter((post) => {
            return (regex.test(post.title) || regex.test(post.desc) || regex.test(post.where) || regex.test(post.country) || regex.test(post.city))
        })

        return (
            <div style={{ width: '100%' }}>
                <Map posts={postsListToShow} />
                <div className="map-info-section flex row center space-between">
                    <MapList posts={postsListToShow} setMapFilterBy={this.setMapFilterBy} />

                </div>
            </div>
        )
    }
    componentWillUnmount() {
        const elMainContentContainer = document.querySelector('.main-content-wrapper');
        elMainContentContainer.classList.remove('wide');
    }
}

const mapStateToProps = (state) => {
    const { posts } = state.post;
    const { loggedInUser } = state.user;
    return {
        posts,
        loggedInUser
    }
}

export default connect(mapStateToProps)(UserLocations);