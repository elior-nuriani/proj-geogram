import userService from '../services/userService';

export const loadUsers = () => {
    return async (dispatch) => {
        const users = await userService.query();
        return dispatch(setUsers(users));
    }
}

const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        users
    }
}

export const setUserProfileFilterBy = (filterBy) => {
    return async (dispatch) => {
        return dispatch(setFilterBy(filterBy))
    }
}

const setFilterBy = (filterBy) => {
    return {
        type: 'SET_USER_PROFILE_FILTERBY',
        filterBy
    }
}


export const showLoggedInUserProfileImg = (isShow) => {
    return (dispatch) => {
        return dispatch(setShowLoggedInUserProfileImg(isShow))
    }
}

const setShowLoggedInUserProfileImg = (isShow) => {
    return {
        type: 'SET_IS_SHOW_LOGGEDINUSER_PROFILE_IMG',
        isShow
    }
}

/******************* Updathe Both the user and the logged in user! *******************/

export const updateUsers = (user, isUpdateLoggedInUser = true) => {
    return async (dispatch) => {
        //Update User in database!
        //Update only loggedInUser...
        if (isUpdateLoggedInUser) {
            await dispatch(setUser(user));
        }
        return dispatch(setUpdateUsers(user))
    }
}

const setUpdateUsers = (user) => {
    return {
        type: 'UPDATE_USERS',
        user
    }
}


export const setLoggedInUser = (user) => {
    return async (dispatch) => {
        return dispatch(setUser(user))
    }
}

const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export const updateUserAlertMsg = (msg) => {
    return async (dispatch) => {
        console.log(msg)
        return dispatch(setUserAlertMsg(msg));
    }
}

const setUserAlertMsg = (msg) => {
    return {
        type: 'UPDATE_USER_ALERT_MSG',
        msg
    }
}