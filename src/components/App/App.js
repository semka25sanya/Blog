import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useLayoutEffect } from 'react'
import Layout from '../Layout/Layout'
import Articles from '../Articles/Articles'
import OnePageArticle from '../../pages/OnePageArticle/OnePageArticle'
import { articlesLoad, autoSignInUser } from '../../redux/actions'

import './App.scss'
import CreateAcc from '../../pages/CreateAcc/CreateAcc'
import SignIn from '../../pages/SignIn/SignIn'
import Profile from '../../pages/Profile/Profile'
import NewArticle from '../NewArticle/NewArticle'
import NewArticleEdit from '../../pages/NewArticleEdit/NewArticleEdit'
import WithAuth from '../../HOC/authUsers'

function App() {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(articlesLoad())
    }, [])

    useEffect(() => {
        dispatch(autoSignInUser())
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Articles />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/articles/:slug" element={<OnePageArticle />} />
                <Route path="/sign-up" element={<CreateAcc />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                    path="/profile"
                    element={
                        <WithAuth>
                            <Profile />
                        </WithAuth>
                    }
                />
                <Route
                    path="/new-article"
                    element={
                        <WithAuth>
                            <NewArticle />
                        </WithAuth>
                    }
                />
                <Route
                    path="/articles/:slug/edit"
                    element={
                        <WithAuth>
                            <NewArticleEdit />
                        </WithAuth>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
