import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function StoryBottom({ where, likes }) {
    const formattedLikes = (likes > 1000) ? (likes / 1000).toFixed(1) + 'k' : likes;
    const elWhere = (where) ? (<div className="story-where flex row center justify-start">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <div>{where}</div>
    </div>) : (<div></div>);
    return (<div className="story-bottom-container flex row center space-between">
        {elWhere}
        <div className="story-likes flex row center ">
            <div>{formattedLikes}</div>
            <span>
                <FontAwesomeIcon icon={faHeartSolid} />
            </span>
        </div>
    </div>)
}