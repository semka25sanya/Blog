import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Alert } from 'antd'
import Article from '../../components/Article/Article'
import { oneArticleLoad } from '../../redux/actions'

function OnePageArticle() {
    const { slug } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(oneArticleLoad(slug))
    }, [])

    const oneArticle = useSelector((state) => {
        const { articleReducer } = state
        return articleReducer.article
    })

    const error = useSelector((state) => {
        const { errorReducer } = state

        return errorReducer.error
    })

    const currentArticle = useSelector((state) => state.articleReducer.article.author?.username)

    const currentUser = useSelector((state) => state.userReducer.user?.username)

    const countLikes = useSelector((state) => state.articleReducer.article?.favoritesCount)

    const favorited = useSelector((state) => state.articleReducer.article?.favorited)

    const Slug = slug

    const { tagList, description, createdAt, body } = oneArticle

    const username = oneArticle.author?.username
    const image = oneArticle.author?.image
    const title = oneArticle?.title

    const contentArticle =
        error === true ? (
            <Alert
                style={{ marginTop: '50px' }}
                message="Ошибка!"
                description="Ошибка получения данных с сервера!"
                type="warning"
                showIcon
            />
        ) : (
            <Article
                body={body}
                title={title}
                tags={tagList}
                name={username}
                img={image}
                description={description}
                creationDate={createdAt}
                currentArticle={currentArticle}
                currentUser={currentUser}
                Slug={Slug}
                favoritesCount={countLikes}
                favorited={favorited}
            />
        )

    return contentArticle
}

export default OnePageArticle
