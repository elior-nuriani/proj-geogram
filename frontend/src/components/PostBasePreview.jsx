import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

export default function PostBasePreview({ post }) {
    return (
        <div className="btn post-img ratio-square" style={{ backgroundImage: `linear-gradient(to bottom, var(--image-layer-primary),var(--image-layer-second)), url(${post.imgs[0]})` }}>
            <div className="img-content-wrapper flex row center space-between">
                <div className="img-content flex row center justify-start">
                    <span>
                        <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                    </span>
                    <span className="where flex column center">
                        {post.where}
                    </span>
                </div>
                <div className="location-arrow flex row center btn">
                    <FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}