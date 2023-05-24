import { useSelector } from 'react-redux'
import NewArticle from '../../components/NewArticle/NewArticle'

function NewArticleEdit() {
    const dataArticleEdit = useSelector((state) => state.articleReducer.article)

    const { title, description, body, tagList } = dataArticleEdit
    return <NewArticle title={title} description={description} body={body} tagList={tagList} />
}

export default NewArticleEdit
