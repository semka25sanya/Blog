import { CATCH_ERROR } from './types'

const initialState = {
    error: false,
}

export const errorReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case CATCH_ERROR:
            return {
                ...state,
                error: true,
            }

        default:
            return state
    }
}

export default errorReducer
