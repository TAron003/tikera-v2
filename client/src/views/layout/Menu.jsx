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
            <nav id='lgNav' className='hidden lg:navbar flex-row m-auto mt-2.5 mb-2.5'>
                <div className='navbar-start p-2.5'>
                    <NavLink className='btn btn-ghost' to='/movies' onClick={handleClick}>
                        <h1 className="text-emerald-500 text-4xl">
                            TIKERA
                        </h1>
                    </NavLink>
                </div>
                <div className='navbar-center flex-row p-2.5'>
                    {isLoggedIn && isAdmin && <div id='lgAdminMenu'>
                        <NavLink className='btn btn-ghost' to='/manage/movies' onClick={handleClick}>
                            Manage movies
                        </NavLink>
                        <NavLink className='btn btn-ghost' to='/manage/screenings' onClick={handleClick}>
                            Manage screenings
                        </NavLink>
                        <NavLink className='btn btn-ghost' to='/bookings'>
                            Bookings
                        </NavLink>
                    </div>}
                    {isLoggedIn && !isAdmin && <div id='lgUserMenu'>
                        <NavLink className='btn btn-ghost' to='/bookings'>
                            Bookings
                        </NavLink>
                    </div>}
                </div>
                <div className='navbar-end p-2.5'>
                    {!isLoggedIn && <div id='lgVisitor'>
                        <NavLink className='btn btn-ghost' to='/auth/login'>
                            Login
                        </NavLink>
                        <NavLink className='btn btn-ghost' to='/auth/register'>
                            Register
                        </NavLink>
                    </div>}
                    {isLoggedIn && <div id='lgUser' className="dropdown">
                        <NavLink to="/movies" tabIndex={0} role="button" className="m-1 btn btn-ghost text-xl">{<>{user?.data.user.name}<UserIcon /></>} </NavLink>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 rounded-box w-52">
                            <li><NavLink onClick={handleLogOut}>Logout</NavLink></li>
                        </ul>
                    </div>}
                </div>
            </nav>
            <nav id='nav' className='block lg:hidden navbar h-fit'>
                <div className='navbar-start p-2.5'>
                    <NavLink className='btn btn-ghost' to='/movies' onClick={handleClick}>
                        <h1 className="text-emerald-500 text-4xl">
                            TIKERA
                        </h1>
                    </NavLink>
                </div>
                <div className='navbar-end p-2.5'>
                    <div className="dropdown">
                            <NavLink to="/movies" tabIndex={0} role="button" className="m-1 btn btn-ghost text-xl">{<>{user?.data.user.name}<UserIcon /></>} </NavLink>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-700 rounded-box w-52">
                                {isLoggedIn && isAdmin && <>
                                    <li><NavLink to='/manage/movies'>Manage movies</NavLink></li>
                                    <li><NavLink to='/manage/screenings'>Manage screenings</NavLink></li>
                                    <hr /></>
                                }
                                {isLoggedIn && <>
                                    <li><NavLink to='/bookings'>Bookings</NavLink></li>
                                    <hr />
                                    <li><NavLink onClick={handleLogOut}>Logout</NavLink></li></>
                                }
                                {!isLoggedIn && <>
                                    <li><NavLink to='/auth/login'>Login</NavLink></li>
                                    <li><NavLink to='/auth/register'>Register</NavLink></li></>
                                }
                            </ul>
                    </div>
                </div>
            </nav>
            {logoutSuccess && <div className="toast" id='logoutToast'>
                <div className="alert alert-success">
                    <span>Logout successful!</span>
                    <button onClick={handleCloseToast} className="btn btn-ghost">
                        <IoMdClose />
                    </button>
                </div>
            </div>}
        </>
    )
}