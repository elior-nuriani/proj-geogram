import React from 'react';
import PostPreview from './PostPreview';
import {Link} from 'react-router-dom';

export default function PostList({ postsToShow }) {
    const posts = postsToShow.map((post) => {
        return (<Link to={`/post/details/${post._id}`} key={post._id}>
            <PostPreview post={post} />
        </Link>)
    })

    return (
        <div className="discover-posts-wrapper ">
            {posts}
        </div>
    )
}