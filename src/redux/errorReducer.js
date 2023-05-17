import { CATCH_ERROR } from './types'

const initialState = {
    error: false,
}

// eslint-disable-next-line import/prefer-default-export
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
