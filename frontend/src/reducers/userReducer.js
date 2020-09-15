// ********** Redux persist instead *********
// var sessionUser = null;
// if(sessionStorage.loggedInUser) sessionUser = JSON.parse(sessionStorage.loggedInUser);


const INITIAL_STATE = {
    users: [],
    loggedInUser: null,
    userProfileFilterBy: '',
    isShowLoggedInUserProfileImg: true,
    userAlertMsg : ''
}

export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ('SET_USERS'):
            return {
                ...state,
                users: action.users
            }
        case ('SET_USER'):
            const loggedInUser = Object.assign({}, action.user);
            return {
                ...state,
                loggedInUser
            }
        case ('SET_USER_PROFILE_FILTERBY'):
            return {
                ...state,
                userProfileFilterBy: action.filterBy
            }
        case ('UPDATE_USERS'): {
            const user = action.user;
            const idx = state.users.findIndex((currUser) => {
                return currUser._id === user._id
            })
            return {
                ...state,
                users: [
                    ...state.users.slice(0, idx),
                    action.user,
                    ...state.users.slice(idx + 1)
                ]

            }
        }
        case ('SET_IS_SHOW_LOGGEDINUSER_PROFILE_IMG'):
            return {
                ...state,
                isShowLoggedInUserProfileImg:action.isShow
            }
        case ('UPDATE_USER_ALERT_MSG') :
            return {
                ...state,
                userAlertMsg:action.msg
            }
        default: return state;
    }
}