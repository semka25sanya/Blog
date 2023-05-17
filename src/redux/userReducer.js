import { SIGN_IN, LOG_OUT } from './types'

const initialState = {
    user: [],
    isLogined: false,
}

// eslint-disable-next-line import/prefer-default-export
export const userReducer = (state = initialState, action = {}) => {
    // console.log(action.type)
    // console.log(action)
    // console.log(state)
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: { ...action.user },
                isLogined: true,
            }

        case LOG_OUT:
            return {
                ...state,
                user: { ...action.user },
                isLogined: false,
            }
        default:
            return state
    }
}
