import { LOAD_ARTICLES, CATCH_ARTICLES_ERROR } from './types'

const initialState = {
    articles: [],
    countArticles: 0,
    currentPage: 1,
    error: false,
}

export const articlesReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                articles: [...action.payload],
                countArticles: action.articlesCount,
                currentPage: action.page,
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

export default articlesReducer
