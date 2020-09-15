import React, { Component } from 'react';
import { connect } from 'react-redux'

class UserProfileFollow extends Component {
    render() {
        const { user, users } = this.props;
        const { follow } = user;


        //Who follows the user base on the users 
        const filteredFollows = users.filter((currUser) => {
            // console.log(currUser, currUser.follow, user._id)
            return currUser.follow.includes(user._id)
        })
        const followsMap = filteredFollows.map((user) =>{
            return  (<div key={user._id} className="post-user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>);
        })

 

        //Who the user is following 
        const followingMap = follow.map((follow) => {
            let user = _findUser(users, follow);
            return (<div key={user._id} className="post-user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>)
        })

        
        const elFollow = (followsMap.length) ? (<div className="flex row center justify-start">
            {followsMap}
        </div>) : (<div className="profile-default-msg" >No Followers for now</div>)


        const elFollowing = (followingMap.length) ? (<div className="flex row center justify-start">
            {followingMap}
        </div>) : (<div className="profile-default-msg">{user.userName} doesnt follow anyone for now</div>)


        return (
            <div className="user-profile-follow-container flex column space-evenly">
                <div className="following-container">
                    <h3>Following</h3>
                    {elFollowing}
                </div>
                <div className="follows-container">
                    <h3>Followers</h3>
                    {elFollow}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { posts } = state.post;
    const { id } = ownProps.match.params;
    const { users } = state.user;

    const user = users.find((currUser) => {
        return currUser._id === id;
    })

    return {
        users,
        user,
        posts
    }
}

export default connect(mapStateToProps)(UserProfileFollow)





function _findUser(users, id) {
    return users.find((currUser) => {
        return currUser._id === id;
    })
}