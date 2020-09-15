import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

class MapList extends Component {
    setFilter = (e) => {
        const { value } = e.target;
        this.props.setMapFilterBy(value)
    }

    moveToPostPreview = (id) => {
        this.props.history.push(`/post/details/${id}`)
    }

    render() {
        const { posts } = this.props;
        const formmatedLikes = (likes) => {
            return (+likes > 1000) ? (+likes / 1000).toFixed(1) + 'K' : likes;
        }
        const elMapPreview = (posts.length)? posts.map((post, idx) => {
            return (
                <div onClick={() => {this.moveToPostPreview(post._id)}} key={idx} className="map-list-preview btn flex row center space-between">
                    <div className="flex row center">
                        <div className="location-post-img" style={{ backgroundImage: `url(${post.imgs[0]})` }}></div>
                        <div className="flex column center align-start">
                            <div>{post.title}</div>
                            <div>{post.where}</div>
                        </div>
                    </div>
                    <div className="likes">
                        {formmatedLikes(post.likes)}
                    </div>
                </div>

            )
        }) : (<h3 className="flex row center msg-saved-locations">No Saved Locations</h3>)
        return (
            <div className="map-list-container flex column center justify-start wrap">
                <div className="flex row center space-between">
                    <input onChange={(e) => { this.setFilter(e) }} className="map-filter" type="text" placeholder="Filter Your Posts ..."></input>
                    <span className="show-more btn flex row center">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </div>
                {elMapPreview}
            </div>
        )
    }
}

export default withRouter(MapList);