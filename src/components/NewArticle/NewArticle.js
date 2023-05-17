import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'

import classes from './NewArticle.module.scss'
import { postNewArticle, updateArticle } from '../../redux/actions'
//

function NewArticle({ title = '', description = '', body = '', tagList = [] }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tags: tagList.map((value) => ({ value })),
        },
    })

    const { slug } = useParams()
    const ArticleTitle = slug !== undefined ? 'Edit article' : 'Create new article'
    console.log(slug)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tags',
    })

    const handleTags = (e) => {
        append({
            value: e.target.value,
        })
    }

    function onSubmit(data) {
        if (slug !== undefined) {
            dispatch(updateArticle(data, slug))
        } else {
            dispatch(postNewArticle(data))
        }

        navigate('/')
    }

    function errorMess(val) {
        return (
            errors[val] && errors[val].type === 'required' && <p className={classes.ErrorMessage}>{val} is required</p>
        )
    }

    return (
        <div className={classes.createArticleWrapper}>
            <h3 className={classes.createArticleTitle}>{ArticleTitle}</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.createArticleForm}>
                <label className={classes.createArticleFormLabel}>
                    <p className={classes.createArticleFormSection}>Title</p>
                    <input
                        type="text"
                        className={classes.createArticleFormInput}
                        placeholder="Title"
                        {...register('Title', {
                            required: true,
                        })}
                        defaultValue={title}
                    />
                </label>

                {errorMess('Title')}

                <label className={classes.createArticleFormLabel}>
                    <p className={classes.createArticleFormSection}>Short description</p>
                    <input
                        type="text"
                        className={classes.createArticleFormInput}
                        placeholder="Description"
                        {...register('Description', {
                            required: true,
                        })}
                        defaultValue={description}
                    />
                </label>

                {errorMess('Description')}
                <label className={classes.createArticleFormLabel}>
                    <p className={classes.createArticleFormSection}>Text</p>
                    <textarea
                        type="text"
                        className={`${classes.createArticleFormInput} ${classes.createArticleFormInputText}`}
                        placeholder="Text"
                        {...register('Text', {
                            required: true,
                        })}
                        defaultValue={body}
                    />
                </label>
                {errorMess('Text')}

                <label className={classes.createArticleFormLabel}>
                    <p className={classes.createArticleFormSection}>Tags</p>
                    <div className={classes.createArticleFormTagsWrapper}>
                        <div className={classes.createArticleTagsList}>
                            {fields.map((field, index) => (
                                <div className={classes.createArticleTag} key={field.id}>
                                    <Controller
                                        name={`tags.${index}.value`}
                                        control={control}
                                        rules={{ required: true }}
                                        value={field.value || ''}
                                        render={({ tag }) => (
                                            <input
                                                {...tag}
                                                placeholder="Tag"
                                                type="text"
                                                className={`${classes.createArticleFormInput} ${classes.createArticleFormInputTag}`}
                                                {...register(`tags.${index}.value`, {
                                                    required: 'Поле обязательно к заполнению',
                                                })}
                                            />
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className={classes.createArticleFormButton}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={(e) => handleTags(e)}
                                className={`${classes.createArticleFormButton} ${classes.createArticleFormButtonAdd}`}
                            >
                                Add tag
                            </button>
                        </div>
                    </div>
                    <input type="hidden" {...register('tags')} />
                </label>

                <button type="submit" onClick={handleSubmit(onSubmit)} className={classes.createArticleFormButtonSend}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default NewArticle
