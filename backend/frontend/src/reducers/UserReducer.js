import { USER_UPDATE_INDIVIDUAL_REQUEST, USER_UPDATE_INDIVIDUAL_SUCCESS, USER_UPDATE_INDIVIDUAL_FAIL, USER_UPDATE_INDIVIDUAL_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DATABASE_REQUEST, USER_DATABASE_SUCCESS, USER_DATABASE_FAIL, USER_DATABASE_RESET, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT_REQUEST, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_DETAIL_RESET} from "../constants/UserConstants";

export const userLoginReducer = ( state = {  }, action ) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_REQUEST:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = ( state = {  }, action ) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true}
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT_REQUEST:
            return {}
        default:
            return state
    }
}

export const userDetailReducer = ( state = { user: {} }, action ) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { ...state, loading: true}
        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAIL_RESET:
            return { user:{}}
        default:
            return state
    }
}

export const userUpdateReducer = ( state = {  }, action ) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true}
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const userDatabaseReducer = (state = {userInfo:[]}, action) => {
    switch (action.type) {
        case USER_DATABASE_REQUEST:
            return { loading: true }
        case USER_DATABASE_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_DATABASE_FAIL:
            return { loading: false, error: action.payload }
        case USER_DATABASE_RESET:
            return {userInfo:[]}
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userUpdateIndividualReducer = (state = { user: {}}, action) => {
    switch (action.type) {
        case USER_UPDATE_INDIVIDUAL_REQUEST:
            return { loading: true }
        case USER_UPDATE_INDIVIDUAL_SUCCESS:
            return { loading: false, success: true}
        case USER_UPDATE_INDIVIDUAL_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_INDIVIDUAL_RESET:
            return { user: {}}
        default:
            return state
    }
}



