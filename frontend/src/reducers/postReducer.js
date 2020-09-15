


const INITIAL_STATE = {
    posts: [],
    sortBy: 'popular'
}


export default function postReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ('SET_POSTS'):
            return {
                ...state,
                posts: action.posts
            }
        case ('SET_SORT'):
            return {
                ...state,
                sortBy: action.sortBy
            }
        case ('UPDATE_POST'):
            const post = action.post;
            const idx = state.posts.findIndex((currPost) => {
                return currPost._id === post._id
            })
            return {
                ...state,
                posts: [
                    ...state.posts.slice(0, idx),
                    action.post,
                    ...state.posts.slice(idx + 1)
                ]
            }
        case ('ADD_POST'):
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        default:
            return state;
    }
}