import { useSelector, useDispatch } from 'react-redux'

import { Pagination, Alert } from 'antd'
import './Aricles.scss'

import { useEffect } from 'react'
import Article from '../Article/Article'
import { articlesLoad } from '../../redux/actions'

function Articles() {
    const arrayArticles = useSelector((state) => {
        const { articlesReducer } = state
        return articlesReducer.articles
    })

    const countArticles = useSelector((state) => {
        const { articlesReducer } = state
        return articlesReducer.countArticles
    })

    const error = useSelector((state) => {
        const { articlesReducer } = state

        return articlesReducer.error
    })

    const count = () => {
        let id = 0
        return () => id++
    }
    const idUnic = count()

    const arr = arrayArticles.map((el) => (
        <Article
            body={el.body}
            key={idUnic()}
            description={el.description}
            name={el.author.username}
            img={el.author.image}
            title={el.title}
            tags={el.tagList}
            creationDate={el.createdAt}
            slug={el.slug}
            favoritesCount={el.favoritesCount}
            favorited={el.favorited}
        >
            {el}
        </Article>
    ))

    const articlesContent =
        error === true ? (
            <Alert
                style={{ marginTop: '50px' }}
                message="Ошибка!"
                description="Ошибка получения данных с сервера!"
                type="warning"
                showIcon
            />
        ) : (
            arr
        )

    const dispatch = useDispatch()

    function changePage(e) {
        dispatch(articlesLoad(e))
    }

    const page = useSelector((state) => {
        const { articlesReducer } = state
        return articlesReducer.currentPage
    })

    useEffect(() => {
        dispatch(articlesLoad())
    }, [])

    const paginator =
        countArticles !== 0 && !error ? (
            <Pagination
                className="paginator"
                current={page}
                onChange={(e) => changePage(e)}
                defaultCurrent={1}
                total={countArticles * 2}
                showSizeChanger={false}
            />
        ) : null

    return (
        <>
            {articlesContent}
            {paginator}
        </>
    )
}

export default Articles
