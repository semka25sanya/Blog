import { Link, useNavigate } from 'react-router-dom'
import { Alert } from 'antd'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Card.module.scss'
import { registrationNewUser } from '../../redux/actions'

function CreateAcc() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const error = useSelector((state) => state.userReducer.error)

    const errMess =
        error === true ? (
            <Alert
                style={{ marginTop: '5px', marginBottom: '10px' }}
                description="Пользователь с такими данными уже существует! Измените, пожалуйста, данные"
                type="error"
                showIcon
            />
        ) : null

    const dispatch = useDispatch()

    const onSubmit = (data) => dispatch(registrationNewUser(data))

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

    // eslint-disable-next-line consistent-return
    function validateRepeatPassword(value) {
        const password = watch('Password')
        if (value !== password) {
            return 'Passwords do not match'
        }

    }

    function errorMess(val) {
        return (
            errors[val] && errors[val].type === 'required' && <p className={classes.ErrorMessage}>{val} is required</p>
        )
    }

    return (
        <div className={classes.Card}>
            <h3 className={classes.CardTitle}>Create new account</h3>
            {errMess}
            <form onSubmit={handleSubmit(onSubmit)} className={classes.CardForm}>
                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Username</p>
                    <input
                        type="text"
                        className={classes.CardInput}
                        placeholder="Username"
                        {...register('Username', {
                            required: true,
                            minLength: 3,
                            maxLength: 20,
                        })}
                    />
                </label>

                {errorMess('Username')}

                {((errors.Username && errors.Username.type === 'minLength') ||
                    (errors.Username && errors.Username.type === 'maxLength')) && (
                    <p className={classes.ErrorMessage}>Username must be at least 3 and at most 20 characters long</p>
                )}

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
                        {...register('Password', { required: true, minLength: 6, maxLength: 40 })}
                    />
                </label>

                {errorMess('Password')}

                {((errors.Password && errors.Password.type === 'minLength') ||
                    (errors.Password && errors.Password.type === 'maxLength')) && (
                    <p className={classes.ErrorMessage}>Password must be at least 6 and at most 40 characters long</p>
                )}

                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Repeat Password</p>
                    <input
                        type="password"
                        className={classes.CardInput}
                        placeholder="Repeat Password"
                        {...register('RepeatPassword', { required: true, validate: validateRepeatPassword })}
                    />
                </label>

                {errorMess('RepeatPassword')}

                {errors.RepeatPassword && <p className={classes.ErrorMessage}>{errors.RepeatPassword.message}</p>}

                <label className={classes.CardCheckbox}>
                    <input
                        type="checkbox"
                        name="agree"
                        value="agree"
                        className={classes.CardCheck}
                        {...register('Agree', { required: true })}
                    />
                    <p className={classes.CardSectionTitle}>I agree to the processing of my personal information</p>
                </label>

                {errors.Agree && (
                    <p className={classes.ErrorMessage}>
                        You must agree to the processing of your personal information
                    </p>
                )}

                <button type="submit" className={classes.CardButton} onClick={handleSubmit(onSubmit)}>
                    Create
                </button>

                <p className={classes.CardQuestion}>
                    Already have an account?
                    <Link className="link" to="/sign-in">
                        {' '}
                        Sign In.
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default CreateAcc
