import React from 'react';
import PostPreviewFeed from './PostPreviewFeed';
import {Link} from 'react-router-dom';

export default function PostList({ postsToShow }) {
    const posts = postsToShow.map((post) => {
        return (<Link to={`/post/details/${post._id}`} key={post._id}>
            <PostPreviewFeed post={post} />
        </Link>)
    })

    return (
        <div className="">
            {posts}
        </div>
    )
}