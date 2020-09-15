import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function StoryTop({ user, handleExitStory, txt }) {
    const elTxt = (txt) ? (<div className="story-txt">{txt}</div>) : null
    return (<div className="story-top-container flex row center space-between">
        <div className="flex row center justify-start">
            <div className="story-avatar" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
            <div className="story-user-info flex row center align-start">
                <div className="story-user">{user.userName}</div>
                {elTxt}
            </div>
        </div>
        <div onClick={() => { handleExitStory() }} className="story-exit flex row center btn">
            <FontAwesomeIcon icon={faTimes} />
        </div>
    </div>)
}