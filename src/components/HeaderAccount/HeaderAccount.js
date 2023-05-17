import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './HeaderAccount.module.scss'
import { logOutUser } from '../../redux/actions'

function HeaderAccount() {
    const userName = useSelector((state) => {
        const { userReducer } = state
        return userReducer.user.username
    })

    const image = useSelector((state) => {
        const { userReducer } = state
        return userReducer.user.image
    })

    const imgForNewUser =
        'https://sun9-67.userapi.com/s/v1/ig2/ujkACh6KZVmoHbaa_esFUY1ZSyEnOJYNfAmXJUnmHU8rC86WyOKdlzFf8WPISRQjWUIykw8JpBKn5wWGbixF9Isc.jpg?size=200x200&quality=96&crop=125,3,2154,2154&ava=1'

    const imgForUser = image !== undefined ? image : imgForNewUser

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(logOutUser())
    }

    return (
        <div className={classes.HeaderAccount}>
            <Link to="/new-article" className={`${classes.CreateArticle} ${classes.HeaderAccountLink}`}>
                Create article
            </Link>
            <Link className={classes.HeaderAccountLink} to="/profile">
                <p className={classes.Username}>{userName}</p>
                <img alt="logo" className={classes.Img} src={imgForUser} />
            </Link>
            <button type="button" onClick={logOut} className={classes.LogOut}>
                Log Out
            </button>
        </div>
    )
}

export default HeaderAccount
