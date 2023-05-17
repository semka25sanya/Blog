import { LOAD_ONE_ARTICLE } from './types'

const initialState = {
    article: [],
    isOneArticle: false,
}

// eslint-disable-next-line import/prefer-default-export
export const articleReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_ONE_ARTICLE:
            console.log(action.payload)
            return {
                ...state,
                article: action.payload,
                isOneArticle: true,
            }

        default:
            return state
    }
}
