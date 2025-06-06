import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import { logOut, reset } from '../../store/movieSlice'
import { useNavigate } from 'react-router'

export const Menu = () => {
    const user = useSelector(state => state.movie.user)
    const isLoggedIn = useSelector(state => state.movie.isLoggedIn)
    const isAdmin = useSelector(state => state.movie.isAdmin)
    const [logoutSuccess, setLogoutSuccess] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(logOut())
        navigate('/movies')
        setLogoutSuccess(true)
    }

    useEffect(() => {
        if (isLoggedIn) {
            setLogoutSuccess(false)
        }
    }, [isLoggedIn, setLogoutSuccess])

    useEffect(() => {
        if (logoutSuccess) {
            navigate('/movies')
        }
    }, [logoutSuccess])

    const handleClick = () => {
        dispatch(reset())
    }

    const handleCloseToast = () => {
        setLogoutSuccess(false)
    }

    return (
        <>
            <nav className='navbar h-fit'>
                <div className='navbar-start p-2.5'>
                    <NavLink className='btn btn-ghost' to='/movies' onClick={handleClick}>
                        <h1 className="text-emerald-500 text-4xl">
                            TIKERA
                        </h1>
                    </NavLink>
                    <div id='adminMenu' style={{display: isLoggedIn && isAdmin ? 'block' : 'none'}}>
                        <NavLink className='btn btn-ghost' to='/manage/movies' onClick={handleClick}>
                            Manage movies
                        </NavLink>
                        <NavLink className='btn btn-ghost' to='/manage/screenings' onClick={handleClick}>
                            Manage screenings
                        </NavLink>
                    </div>
                    <div id='userMenu' style={{display: isLoggedIn ? 'block' : 'none'}}>
                        <NavLink className='btn btn-ghost' to='/bookings'>
                            Bookings
                        </NavLink>
                    </div>
                </div>
                <div className='navbar-end p-2.5'>
                    <div id='visitor' style={{display: isLoggedIn ? 'none' : 'block'}}>
                        <NavLink className='btn btn-ghost' to='/auth/login'>
                            Login
                        </NavLink>
                        <NavLink className='btn btn-ghost' to='/auth/register'>
                            Register
                        </NavLink>
                    </div>
                    <div id='user' className='grid grid-cols-2' style={{display: isLoggedIn ? 'block' : 'none'}}>
                        <div className="dropdown">
                            <NavLink to="/movies" tabIndex={0} role="button" className="m-1 btn btn-ghost text-xl">{<>
                            {user?.data.user.name}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                            </>} </NavLink>
                            {isLoggedIn && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                                <li><NavLink onClick={handleLogOut}>Logout</NavLink></li>
                            </ul>}
                        </div>
                    </div>
                </div>
            </nav>
            {logoutSuccess && <div className="toast" id='logoutToast'>
                <div className="alert alert-success">
                <span>Logout successful!</span>
                <button type='button' className='btn btn-ghost' onClick={handleCloseToast}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
        </>
    )
}