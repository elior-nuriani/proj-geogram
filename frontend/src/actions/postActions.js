import postService from '../services/postService';



export const loadPosts = () => {
    return async (dispatch) => {
        const posts = await postService.query();
        return dispatch(setPosts(posts))
    }
}

const setPosts = (posts) => {
    return {
        type: 'SET_POSTS',
        posts
    }
}

export const changeSortBy = (sortBy) => {
    return async (dispatch) => {
        return dispatch(setSortBy(sortBy))
    }
}

const setSortBy = (sortBy) => {
    return {
        type: 'SET_SORT',
        sortBy
    }
}

export const updatePosts = (post, isUpdatePostToDb = true) => {
    return async (dispatch) => {
        //Update Post in database!
        return dispatch(setUpdatePosts(post))
    }
}

const setUpdatePosts = (post) =>{
    return {
        type:'UPDATE_POST',
        post
    }
}


export const addPost = (post , isAddPostToDb = true) =>{
    return async (dispatch) => {
        //const addedPost = service ....
        return dispatch(setAddPost(post))
    }
}

const setAddPost = (post) =>{
    return {
        type:'ADD_POST',
        post
    }
}