import {
    LOAD_ARTICLES,
    LOAD_ONE_ARTICLE,
    CATCH_ERROR,
    SIGN_IN,
    LOG_OUT,
    POST_ARTICLE,
    CATCH_ARTICLES_ERROR,
    CATCH_SIGN_IN_ERROR,
    CATCH_EDIT_USER_ERROR,
    SET_TOKEN,
    DELETE_TOKEN,
    AVATAR_ERROR,
    AVATAR_SUCCESS,
} from './types'

const baseUrl = 'https://blog.kata.academy/api/'

export function articlesLoad(numberPage = 1) {
    return (dispatch, getState) => {
        const { token } = getState().tokenReducer
        const offset = (numberPage - 1) * 5
        fetch(`${baseUrl}articles?limit=5&offset=${offset}`, {
            headers: { Authorization: `Token ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then(({ articles, articlesCount }) =>
                dispatch({ type: LOAD_ARTICLES, payload: articles, articlesCount, page: numberPage })
            )
            .catch(() => dispatch({ type: CATCH_ARTICLES_ERROR }))
    }
}

export function oneArticleLoad(slugArt = '1-2-3-4-5-6-e3jlt0') {
    return (dispatch, getState) => {
        const { token } = getState().tokenReducer
        fetch(`${baseUrl}articles/${slugArt}`, {
            headers: { Authorization: `Token ${token}` },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then((data) => dispatch({ type: LOAD_ONE_ARTICLE, payload: data.article, isOneArticle: true }))
            .catch(() => dispatch({ type: CATCH_ARTICLES_ERROR }))
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

        fetch(`${baseUrl}users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyUser),
        })
            .then((response) => {
                if (!response.ok) {
                    dispatch({ type: AVATAR_ERROR })
                }
                return response.json()
            })
            .then((data) => {
                localStorage.setItem('token', data.user.token)

                dispatch({ type: SIGN_IN, user: data.user })
                dispatch({ type: SET_TOKEN, token: data.user.token })
            })
            .catch(() => dispatch({ type: CATCH_SIGN_IN_ERROR }))
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

        fetch(`${baseUrl}users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })

            .then((data) => {
                localStorage.setItem('token', data.user.token)

                dispatch({ type: SIGN_IN, user: data.user })
                dispatch({ type: SET_TOKEN, token: data.user.token })
            })
            .catch(() => dispatch({ type: CATCH_SIGN_IN_ERROR }))
    }
}

export function logOutUser() {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({ type: LOG_OUT, user: [] })
        dispatch({ type: DELETE_TOKEN, token: null })
    }
}

export function autoSignInUser() {
    return (dispatch) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`${baseUrl}user`, {
                headers: { Authorization: `Token ${token}` },
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch({ type: SIGN_IN, user: data.user })
                    dispatch({ type: SET_TOKEN, token: data.user.token })
                })
                .catch(() => dispatch({ type: CATCH_ERROR }))
        }
    }
}

export function editUser(dataForEdit) {
    return (dispatch, getState) => {
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
            const img = new Image()
            img.onload = () => {
                bodyUser.user.image = AvatarImage
                const { token } = getState().tokenReducer
                fetch(`${baseUrl}user`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
                    body: JSON.stringify(bodyUser),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(response.status)
                        }
                        return response.json()
                    })
                    .then((data) => {
                        dispatch({ type: SIGN_IN, user: data.user })
                        dispatch({ type: AVATAR_SUCCESS })
                    })
                    .catch(() => dispatch({ type: CATCH_EDIT_USER_ERROR }))
            }
            img.onerror = () => {
                dispatch({ type: AVATAR_ERROR })
            }
            img.src = AvatarImage
        }
    }
}

export function postNewArticle(dataNewArticle) {
    return (dispatch, getState) => {
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

        const { token } = getState().tokenReducer

        fetch(`${baseUrl}articles/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            body: JSON.stringify(bodyArticle),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then((data) => {
                dispatch({ type: POST_ARTICLE, article: data.article })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function updateArticle(dataForUpdate, slug) {
    return (dispatch, getState) => {
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

        const { token } = getState().tokenReducer

        fetch(`${baseUrl}articles/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
            body: JSON.stringify(bodyArticle),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then((data) => {
                dispatch({ type: POST_ARTICLE, article: data.article })
            })
            .catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function deleteArticle(slug) {
    return (dispatch, getState) => {
        const { token } = getState().tokenReducer
        fetch(`${baseUrl}articles/${slug}`, {
            method: 'DELETE',
            headers: { Authorization: `Token ${token}` },
        }).catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function postLike(slug) {
    return (dispatch, getState) => {
        const { token } = getState().tokenReducer

        fetch(
            `${baseUrl}articles/${slug}/favorite
        `,
            {
                method: 'POST',
                headers: { Authorization: `Token ${token}` },
            }
        ).catch(() => dispatch({ type: CATCH_ERROR }))
    }
}

export function deleteLike(slug) {
    return (dispatch, getState) => {
        const { token } = getState().tokenReducer
        fetch(
            `${baseUrl}articles/${slug}/favorite
        `,
            {
                method: 'DELETE',
                headers: { Authorization: `Token ${token}` },
            }
        ).catch(() => dispatch({ type: CATCH_ERROR }))
    }
}
