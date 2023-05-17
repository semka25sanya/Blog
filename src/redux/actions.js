

import { LOAD_ARTICLES, LOAD_ONE_ARTICLE, CATCH_ERROR, SIGN_IN, LOG_OUT, POST_ARTICLE } from './types'

export function articlesLoad(numberPage = 1) {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        const offset = (numberPage - 1) * 5
        fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
            headers: { Authorization: `Token ${token}` },
        })
            .then((response) => response.json())
            .then(({ articles, articlesCount }) =>
                dispatch({ type: LOAD_ARTICLES, payload: articles, articlesCount, page: numberPage })
            )
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function oneArticleLoad(slugArt = '1-2-3-4-5-6-e3jlt0') {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        fetch(`https://blog.kata.academy/api/articles/${slugArt}`, {
            headers: { Authorization: `Token ${token}` },
        })
            .then((response) => response.json())
            .then((data) => dispatch({ type: LOAD_ONE_ARTICLE, payload: data.article, isOneArticle: true }))
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function registrationNewUser(dataOfNewUser) {
    return (dispatch) => {
        const { Username, EmailAddress, Password } = dataOfNewUser

        const bodyUser = {
            user: {
                username: Username,
                email: EmailAddress,
                password: Password,
            },
        }

        fetch(`https://blog.kata.academy/api/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyUser),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.user.token)

                dispatch({ type: SIGN_IN, user: data.user })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function signInUser(dataOfUser) {
    return (dispatch) => {
        const { EmailAddress, Password } = dataOfUser

        const bodyUser = {
            user: {
                email: EmailAddress,
                password: Password,
            },
        }

        fetch(`https://blog.kata.academy/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyUser),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('token', data.user.token)

                dispatch({ type: SIGN_IN, user: data.user })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function logOutUser() {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({ type: LOG_OUT, user: [] })
    }
}

export function autoSignInUser() {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch('https://blog.kata.academy/api/user', {
                headers: { Authorization: `Token ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch({ type: SIGN_IN, user: data.user })
                })
                .catch(() => dispatch({ type: CATCH_ERROR }))
        }
    }
}

export function editUser(dataForEdit) {
    return (dispatch) => {
        const { EmailAddress, Password, Username, AvatarImage } = dataForEdit

        const bodyUser = {
            user: {},
        }
        if (EmailAddress) {
            bodyUser.user.email = EmailAddress
        }

        if (Password) {
            bodyUser.user.password = Password
        }

        if (Username) {
            bodyUser.user.username = Username
        }
        if (AvatarImage) {
            bodyUser.user.image = AvatarImage
        }

        const token = localStorage.getItem('token')

        fetch(`https://blog.kata.academy/api/user`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            body: JSON.stringify(bodyUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                dispatch({ type: SIGN_IN, user: data.user })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function postNewArticle(dataNewArticle) {
    return (dispatch) => {
        const { Title, Description, Text, tags } = dataNewArticle

        const tagList = tags.map((tag) => tag.value)

        const bodyArticle = {
            article: {
                title: Title,
                description: Description,
                body: Text,
                tagList,
            },
        }

        const token = localStorage.getItem('token')

        fetch(`https://blog.kata.academy/api/articles/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            body: JSON.stringify(bodyArticle),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                dispatch({ type: POST_ARTICLE, article: data.article })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function updateArticle(dataForUpdate, slug) {
    return (dispatch) => {
        const { Title, Description, Text, tags } = dataForUpdate

        const tagList = tags.map((tag) => tag.value)

        const bodyArticle = {
            article: {
                title: Title,
                description: Description,
                body: Text,
                tagList,
            },
        }

        const token = localStorage.getItem('token')

        fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            body: JSON.stringify(bodyArticle),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                dispatch({ type: POST_ARTICLE, article: data.article })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function deleteArticle(slug) {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        fetch(`https://blog.kata.academy/api/articles/${slug}`, {
            method: 'DELETE',
            headers: { Authorization: `Token ${token}` },
        }).catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function postLike(slug) {
    return (dispatch) => {
        const token = localStorage.getItem('token')

        fetch(
            `https://blog.kata.academy/api/articles/${slug}/favorite
        `,
            {
                method: 'POST',
                headers: { Authorization: `Token ${token}` },
            }
        ).catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function deleteLike(slug) {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        fetch(
            `https://blog.kata.academy/api/articles/${slug}/favorite
        `,
            {
                method: 'DELETE',
                headers: { Authorization: `Token ${token}` },
            }
        ).catch(() => dispatch({ type: CATCH_ERROR }))
    }
}
