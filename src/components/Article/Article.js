import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { message, Popconfirm } from 'antd'

import ReactMarkdown from 'react-markdown'

import { useEffect, useLayoutEffect, useState } from 'react'

import classes from './Article.module.scss'
import convertDate from '../../utilits/convertDate'
import { oneArticleLoad, deleteArticle, postLike, deleteLike } from '../../redux/actions'
import like from '../../images/like.svg'
import liked from '../../images/liked.svg'

function Article({
    name = 'username',
    title,
    img,
    description,
    tags = [],
    creationDate,
    slug,
    body,
    currentArticle,
    currentUser,
    Slug,
    favoritesCount,
    favorited,
}) {
    useLayoutEffect(() => {
        oneArticleLoad(slug)
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const confirm = () => {
        message.success('Click on Yes')
        dispatch(deleteArticle(Slug))

        navigate('/')
    }

    const cancel = () => message.error('Click on No')

    const edit = currentArticle !== undefined && currentUser !== undefined && currentArticle === currentUser

    const buttons = edit ? (
        <div className={classes.editButtons}>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <button type="button" className={classes.editButtonDelete}>
                    Delete
                </button>
            </Popconfirm>

            <Link to={`/articles/${Slug}/edit`} className={classes.editButtonEdit}>
                Edit
            </Link>
        </div>
    ) : null

    const textBody = slug ? null : <ReactMarkdown>{body}</ReactMarkdown>

    const count2 = () => {
        let id = 0
        return () => id++
    }
    const idUnic = count2()

    const tagsArr = tags.map((tag) => (
        <div key={idUnic()} className={classes.articleTag}>
            {tag}
        </div>
    ))

    const titleArticle =
        slug === undefined ? (
            <h1 className={classes.articleTitle}>{title}</h1>
        ) : (
            <Link to={`/articles/${slug}`} className={classes.articleTitle}>
                {title}
            </Link>
        )

    const descriptionText =
        slug === undefined ? (
            <p className={classes.articleContentGray}>{description}</p>
        ) : (
            <p className={classes.articleContent}>{description}</p>
        )

    const [isLiked, setLiked] = useState(favorited)

    const [isCurrentLiked, setCurrentLiked] = useState(0)

    const slugForLikes = slug === undefined ? Slug : slug

    useEffect(() => {
        setLiked(favorited)
    }, [slugForLikes])

    const onClickLike = () => {
        if (!isLiked) {
            setCurrentLiked(1)
        } else {
            setCurrentLiked(-1)
        }
        const action = isLiked ? deleteLike(slugForLikes) : postLike(slugForLikes)
        dispatch(action)
        setLiked((prevLiked) => !prevLiked)
    }

    const imgForLike = isLiked ? (
        <img className={classes.svgLike} src={liked} alt="" />
    ) : (
        <img className={classes.svgLike} src={like} alt="" />
    )

    return (
        <div className={classes.article}>
            <div className={classes.articleLeft}>
                <div className={classes.articleLeftTop}>
                    <div className={classes.articleTitleAndLikes}>
                        {titleArticle}
                        <div className={classes.likes}>
                            <button
                                type="button"
                                className={classes.svgLikeButton}
                                onClick={onClickLike}
                                aria-label="like"
                            >
                                {imgForLike}
                            </button>

                            <div className={classes.likesCount}>{favoritesCount + +isCurrentLiked}</div>
                        </div>
                    </div>
                </div>
                <div className={classes.articleTags}>{tagsArr}</div>
                {descriptionText}

                <div className={classes.articleBody}>{textBody}</div>
            </div>
            <div className={classes.articleRight}>
                <div className={classes.articleRightInfo}>
                    <div className={classes.articleRightInfoTop}>
                        <p className={classes.articleName}>{name}</p>
                        <p className={classes.articleDate}>{convertDate(creationDate)}</p>
                    </div>
                    <img src={img} alt="user" className={classes.articleImg} />
                </div>
                {buttons}
            </div>
        </div>
    )
}

export default Article
