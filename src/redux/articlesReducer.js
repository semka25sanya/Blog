import { LOAD_ARTICLES } from './types'

const initialState = {
    articles: [],
    countArticles: 0,
    currentPage: 1,
}

// eslint-disable-next-line import/prefer-default-export
export const articlesReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOAD_ARTICLES:
            return {
                ...state,
                articles: [...action.payload],
                countArticles: action.articlesCount,
                currentPage: action.page,
            }

        default:
            return state
    }
}
