import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../../store/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { setUser } from '../../store/movieSlice'
import { IoMdClose } from "react-icons/io";

export const Register = ({setRegisterSuccess}) => {
    const defaultData = {
        name: "New User 1",
        email: "newuser1@example.com",
        password: "password123",
        password_confirmation: "password123"
    }
    const [registerFail, setRegisterFail] = useState(false)
    const [userData, setUserData] = useState(defaultData)
    const [register, {isLoading, isError, isSuccess, error, data}] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.movie.user)
    const isLoggedIn = useSelector(state => state.movie.isLoggedIn)

    useEffect(() => {
        if(isSuccess && data)
        {
            console.log("Registration successful:", data)
            dispatch(setUser(data))
            navigate('/movies')
            setRegisterSuccess(true)
        }
    }, [isSuccess, data, dispatch, setRegisterSuccess])

    useEffect(() => {
        if(isError)
        {
            setRegisterFail(true)
        }
    }, [isError])

    const handleSubmit = (e) => {
        e.preventDefault()
        register({
            "name": userData.name,
            "email": userData.email,
            "password": userData.password,
            "password_confirmation": userData.password_confirmation
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

    const handleRegisterClose = () => {
        setRegisterFail(false)
    }

    return (
        <div className="hero min-h-[80vh] bg-slate-700 rounded-xl">
            {registerFail && <div className="toast">
                <div className="alert alert-error">
                <span>Registration failed. Please check your credentials.</span>
                <button className="btn btn-ghost" onClick={handleRegisterClose}><IoMdClose /></button>
                </div>
            </div>}
            <div className="flex-col w-10/12 hero-content lg:flex-row-reverse">
                <div className="ml-10 text-center lg:text-left">
                <h1 className="text-5xl font-bold">Registration</h1>
                </div>
                <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-300">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" className="input input-bordered" value={userData.name} onInput={(e) => handleInput(e)} required />
                    </div>
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
                    <input type="password" placeholder="Password" name="password" className="input input-bordered" value={userData.password} onInput={(e) => handleInput(e)} />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password confirmation</span>
                    </label>
                    <input type="password" placeholder="Password confirmation" name="password_confirmation" className="input input-bordered" value={userData.password_confirmation} onInput={(e) => handleInput(e)} />
                    </div>
                    <div className="mt-6 form-control">
                    <button className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}