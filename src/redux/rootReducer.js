import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { articlesReducer } from './articlesReducer'
import { articleReducer } from './articleReducer'
import { errorReducer } from './errorReducer'
import { editArticleReducer } from './editArtilceReducer'
import { tokenReducer } from './tokenReducer'

export const rootReducer = combineReducers({
    articlesReducer,
    articleReducer,
    errorReducer,
    userReducer,
    editArticleReducer,
    tokenReducer,
})

export default rootReducer
