import './Header.scss'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import HeaderAccount from '../HeaderAccount/HeaderAccount'

function Header() {
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

    const headerAcc = isLogined ? (
        <HeaderAccount />
    ) : (
        <>
            {' '}
            <Link to="/sign-in" className="headerButton" type="button">
                Sign In
            </Link>
            <Link to="/sign-up" className="headerButton" type="button">
                Sign Up
            </Link>
        </>
    )
    return (
        <header className="header">
            <Link to="/articles" className="headerName">
                Realworld Blog
            </Link>
            <div>
                {/* <HeaderAccount /> */}
                {headerAcc}
            </div>
        </header>
    )
}

export default Header
