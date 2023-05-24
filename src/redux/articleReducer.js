import { LOAD_ONE_ARTICLE, CATCH_ARTICLES_ERROR } from './types'

const initialState = {
    article: [],
    isOneArticle: false,
    error: false,
}

export const articleReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_ONE_ARTICLE:
            return {
                ...state,
                article: action.payload,
                isOneArticle: true,
            }

        case CATCH_ARTICLES_ERROR:
            return {
                ...state,
                error: true,
            }

        default:
            return state
    }
}

export default articleReducer
