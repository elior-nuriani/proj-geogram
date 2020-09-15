import React, { useState } from 'react';
import StoriesPlayer from '../components/StoriesPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default function StoryList({ loggedInUser, users }) {
    let [user, setUser] = useState({});

    function playStories(user) {
        setUser(user);
        document.querySelector('.stories-container').classList.toggle('open')
    }

    function exitStoryPlayer(){
        setUser({});
        document.querySelector('.stories-container').classList.toggle('open')
    }

    let usersMap = loggedInUser.follow.map((follow) => {
        const user = findUser(follow, users);
         return user;
    })

    let elStories = usersMap.map((user, idx) => {
        return (user.storiesUrl.length) ? (
            <div onClick={() => { playStories(user) }} key={user._id} className="story-preview btn">
                <div className="post-user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
                </div>
            </div>
        ) : null
    })

    if (!elStories.length) elStories = (<h5>
        No Stories for now ...
    </h5>)


    return (
        <div className="story-container flex row center justify-start">
            <StoriesPlayer user={user} exitStoryPlayer={exitStoryPlayer}  />
            <div className="post-user-img" style={{ backgroundImage: `url(${loggedInUser.imgUrl})` }}>
                <div className="create-story-layer flex row center">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            {elStories}
        </div>
    )
}




function findUser(follow, users) {
    return users.find((currUser) => {
        return currUser._id === follow;
    })
}