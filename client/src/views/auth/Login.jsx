import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../../store/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUser, setAccessToken } from '../../store/movieSlice'
import { IoMdClose } from "react-icons/io";

export const Login = ({setLoginSuccess}) => {
    const defaultData = {
        "strategy": "local",
        "email": "newuser1@example.com",
        "password": "password123"
    }
    const [userData, setUserData] = useState(defaultData)
    const [loginFail, setLoginFail] = useState(false)
    const [login, {isLoading, isError, isSuccess, error, data}] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.movie.user)
    const isLoggedIn = useSelector(state => state.movie.isLoggedIn)

    useEffect(() => {
        if(isSuccess && data)
        {
            console.log("Login successful:", data)
            dispatch(setUser(data))
            dispatch(setAccessToken(data.data.token.split('|')[1]))
            navigate('/movies')
            setLoginSuccess(true)
        }
    }, [isSuccess, data, dispatch, setLoginSuccess])

    useEffect(() => {
        if(isError)
        {
            setLoginFail(true)
        }
    }, [isError])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            "strategy": "local",
            "email": userData.email,
            "password": userData.password
        })
    }

    const handleInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/movies')
            console.log(user?.data.user.email, isLoggedIn)
        }
    }, [user?.data.user.email, isLoggedIn])

    const handleLoginClose = () => {
        setLoginFail(false)
    }

    return (
        <>
        <div className="hero min-h-[80vh] bg-slate-700 rounded-xl">
            <div className="flex-col w-10/12 hero-content lg:flex-row-reverse">
                <div className="ml-10 text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login</h1>
                </div>
                <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-300">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" name="email" className="input input-bordered" value={userData.email} onInput={(e) => handleInput(e)} required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name="password" className="input input-bordered" value={userData.password} onInput={(e) => handleInput(e)} />
                    </div>
                    <div className="mt-6 form-control">
                    <button className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        {loginFail && <div className="toast">
            <div className="alert alert-error">
            <span>Login failed. Please check your credentials.</span>
            <button className='btn btn-ghost' onClick={handleLoginClose}><IoMdClose /></button>
            </div>
        </div>}
        </>
    )
}