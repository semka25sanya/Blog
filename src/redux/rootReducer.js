import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { articlesReducer } from './articlesReducer'
import { articleReducer } from './articleReducer'
import { errorReducer } from './errorReducer'
import { editArticleReducer } from './editArtilceReducer'

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({
    articlesReducer,
    articleReducer,
    errorReducer,
    userReducer,
    editArticleReducer,
})
