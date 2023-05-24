import { POST_ARTICLE } from './types'

const initialState = {
    article: [],
}

export const editArticleReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case POST_ARTICLE:
            return {
                ...state,
                article: action.article,
            }

        default:
            return state
    }
}

export default editArticleReducer
