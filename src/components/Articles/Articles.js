import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
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
    console.log(arrayArticles)
    const countArticles = useSelector((state) => {
        const { articlesReducer } = state
        return articlesReducer.countArticles
    })

    const error = useSelector((state) => {
        const { errorReducer } = state

        return errorReducer.error
    })

    const count = () => {
        let id = 0
        return () => id++
    }
    const idUnic = count()

    const arr = arrayArticles.map((el) => (
        // <Link to={`/articles/${el.slug}`}>

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
        // </Link>
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
    // console.log(arr)
    const dispatch = useDispatch()

    function changePage(e) {
        // console.log(e)
        dispatch(articlesLoad(e))
    }

    const page = useSelector((state) => {
        const { articlesReducer } = state
        return articlesReducer.currentPage
    })

    // console.log('!', page)
    useEffect(() => {
        dispatch(articlesLoad())
    }, [])

    const paginator =
        countArticles !== 0 ? (
            <Pagination
                className="paginator"
                current={page}
                onChange={(e) => changePage(e)}
                defaultCurrent={1}
                total={countArticles * 2}
                showSizeChanger={false}
            />
        ) : null
    // console.log(arrayArticles)
    return (
        <>
            {articlesContent}
            {paginator}
        </>
    )
}

export default Articles
