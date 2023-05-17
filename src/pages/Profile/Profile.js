import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import classes from '../CreateAcc/Card.module.scss'
import { editUser } from '../../redux/actions'

import './Profile.scss'

function Profile() {
    const userName = useSelector((state) => state.userReducer.user.username)
    const userEmail = useSelector((state) => state.userReducer.user.email)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Username: userName,
            EmailAddress: userEmail,
        },
    })

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const updatedFields = {}
        if (data.Username !== userName) {
            updatedFields.Username = data.Username
        }
        if (data.EmailAddress !== userEmail) {
            updatedFields.EmailAddress = data.EmailAddress
        }
        if (data.Password) {
            updatedFields.Password = data.Password
        }
        if (data.AvatarImage) {
            updatedFields.AvatarImage = data.AvatarImage
        }

        dispatch(editUser(updatedFields))
    }

    function errorMess(val) {
        return (
            errors[val] &&
            errors[val].type === 'required' && <p className={classes.ErrorMessage}>{val} password is required</p>
        )
    }

    return (
        <div className="CardEdit">
            <h3 className={classes.CardTitle}>Edit Profile</h3>
            <form className={classes.CardForm} onSubmit={handleSubmit(onSubmit)}>
                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Username</p>
                    <input
                        type="text"
                        className={classes.CardInput}
                        placeholder={userName}
                        {...register('Username', {
                            required: true,
                        })}
                    />
                </label>

                {errorMess('Username')}

                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Email address</p>
                    <input
                        type="text"
                        className={classes.CardInput}
                        placeholder={userEmail}
                        {...register('EmailAddress', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                    />
                </label>

                {errorMess('EmailAddress')}

                {errors.EmailAddress && errors.EmailAddress.type === 'pattern' && (
                    <p className={classes.ErrorMessage}>Email address must be a valid postal address</p>
                )}

                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>New password</p>
                    <input
                        type="text"
                        className={classes.CardInput}
                        placeholder="New password"
                        {...register('Password', { minLength: 6, maxLength: 40 })}
                    />
                </label>

                {((errors.Password && errors.Password.type === 'minLength') ||
                    (errors.Password && errors.Password.type === 'maxLength')) && (
                    <p className={classes.ErrorMessage}>Password must be at least 6 and at most 40 characters long</p>
                )}

                <label className={classes.CardLabel}>
                    <p className={classes.CardSectionTitle}>Avatar image (url)</p>
                    <input
                        type="text"
                        className={classes.CardInput}
                        placeholder="Avatar image"
                        {...register('AvatarImage', { pattern: /^(ftp|http|https):\/\/[^ "]+$/ })}
                    />
                </label>

                {errors.AvatarImage && errors.AvatarImage.type === 'pattern' && (
                    <p className={classes.ErrorMessage}>Avatar Image must be a valid url</p>
                )}

                <button type="submit" className={classes.CardButton} onClick={handleSubmit(onSubmit)}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default Profile
