import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classes from '../CreateAcc/Card.module.scss'
import './SignIn.scss'

import { signInUser } from '../../redux/actions'

function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function errorMess(val) {
        return (
            errors[val] &&
            errors[val].type === 'required' && <p className={classes.ErrorMessage}>{val} password is required</p>
        )
    }

    const dispatch = useDispatch()

    const onSubmit = (data) => dispatch(signInUser(data))

    const isLogined = useSelector((state) => {
        const { userReducer } = state
        return userReducer.isLogined
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (isLogined) {
            navigate('/')
        }
    }, [isLogined])

    return (
        <div className="CardSignIn">
            <h3 className={classes.CardTitle}>Sign In</h3>
            <form className={classes.CardForm} onSubmit={handleSubmit(onSubmit)}>
                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Email address</p>
                    <input
                        type="email"
                        className={classes.CardInput}
                        placeholder="Email address"
                        {...register('EmailAddress', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                </label>

                {errorMess('EmailAddress')}

                {errors.EmailAddress && errors.EmailAddress.type === 'pattern' && (
                    <p className={classes.ErrorMessage}>Email address must be a valid postal address</p>
                )}

                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Password</p>
                    <input
                        type="password"
                        className={classes.CardInput}
                        placeholder="Password"
                        {...register('Password', { required: true })}
                    />
                </label>

                {errorMess('Password')}

                <button type="button" className={classes.CardButton} onClick={handleSubmit(onSubmit)}>
                    Login
                </button>

                <p className={classes.CardQuestion}>
                    Don’t have an account?{' '}
                    <Link to="/sign-up" className="link">
                        Sign Up.
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default SignIn
