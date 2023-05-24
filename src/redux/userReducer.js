import { SIGN_IN, LOG_OUT, CATCH_SIGN_IN_ERROR, CATCH_EDIT_USER_ERROR, AVATAR_ERROR, AVATAR_SUCCESS } from './types'

const initialState = {
    user: [],
    isLogined: false,
    error: false,
    errorEdit: false,
    avatar: true,
}

export const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: { ...action.user },
                isLogined: true,
                error: false,
                errorEdit: false,
            }

        case LOG_OUT:
            return {
                ...state,
                user: { ...action.user },
                isLogined: false,
            }

        case CATCH_SIGN_IN_ERROR:
            return {
                ...state,
                error: true,
            }

        case CATCH_EDIT_USER_ERROR:
            return {
                ...state,
                errorEdit: true,
            }

        case AVATAR_ERROR:
            return {
                ...state,
                avatar: false,
            }

        case AVATAR_SUCCESS:
            return {
                ...state,
                avatar: true,
            }

        default:
            return state
    }
}

export default userReducer
