import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faShareAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { updatePosts } from '../actions/postActions';
import { updateUsers } from '../actions/usersActions';

function PostIcons({ post, loggedInUser, updateUsers, updatePosts }) {

    function toggleIcon(e, type) {
        e.stopPropagation();
        e.preventDefault();

        //.1 Update Users and loggedInUser = store and db;
        const user = Object.assign({}, loggedInUser);
        const currPost = Object.assign({}, post);

        if (user[type].includes(currPost._id)) {
            const idx = user[type].findIndex((typeId) => {
                return typeId === currPost._id
            })
            user[type].splice(idx, 1);
            if (type === 'favPosts') {
                currPost.likes -= 1;
                updatePosts(currPost);
            }
            updateUsers(user);
        } else {
            user[type].push(currPost._id);
            if (type === 'favPosts') {
                currPost.likes += 1;
                updatePosts(currPost);
            }
            updateUsers(user)
        }

        //.2 Update Posts = store and db;
        //.3 Emit action to routes so all the clients connected gets their post update -
        //  increase / decrease real time the number of likes!
    }

    return (
        <div className="icons-container flex row center space-between">
            <div>
                <span className={(loggedInUser.favPosts.includes(post._id) ? 'btn-liked' : '')} onClick={(e) => { toggleIcon(e, 'favPosts') }}>
                    <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>

                </span>
                <span>
                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                </span>
                <span>
                    <FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon>
                </span>
            </div>
            <span className={(loggedInUser.savedLocations.includes(post._id) ? 'saved-location location-arrow' : 'location-arrow' )} onClick={(e) => { toggleIcon(e, 'savedLocations') }}>
                <FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon>
            </span>
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
    updateUsers,
    updatePosts
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIcons);