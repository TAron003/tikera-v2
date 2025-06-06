import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router'
import { logOut, reset } from '../../store/movieSlice'
import { FaUser as UserIcon } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
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
                            <NavLink to="/movies" tabIndex={0} role="button" className="m-1 btn btn-ghost text-xl">{<>{user?.data.user.name}<UserIcon /></>} </NavLink>
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
                <button type='button' className='btn btn-ghost' onClick={handleCloseToast}><IoMdClose /></button>
                </div>
            </div>}
        </>
    )
}