import { SET_TOKEN, DELETE_TOKEN } from './types'

const initialState = {
    token: null,
}

export function tokenReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
            }
        case DELETE_TOKEN:
            return {
                ...state,
                token: null,
            }
        default:
            return state
    }
}

export default tokenReducer
