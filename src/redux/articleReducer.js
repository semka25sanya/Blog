import { LOAD_ONE_ARTICLE } from './types'

// DELETE_ARTICLE
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
        // case DELETE_ARTICLE:
        //     return {
        //         ...state,
        //         article: action.payload,
        //         isOneArticle: false,
        //     }

        default:
            return state
    }
}
