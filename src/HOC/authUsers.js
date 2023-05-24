import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function WithAuth({ children }) {
    const isLogined = useSelector((state) => state.userReducer.isLogined)

    return isLogined ? children : <Navigate to="/sign-in" />
}

export default WithAuth
