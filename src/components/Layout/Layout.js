import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'

function Layout() {
    return (
        <>
            <Header />
            <div className="AppContent">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
