import { useState } from 'react'
import './App.css'
import { Layout } from './views/layout/Layout'
import { Routes, Route } from 'react-router'
import { Movies } from './views/movies/Movies'
import { Movie } from './views/movies/Movie'
import { Bookings } from './views/bookings/Bookings'
import { Booking } from './views/bookings/Booking'
import { ManageMovies } from './views/manage/ManageMovies'
import { ManageScreenings } from './views/manage/ManageScreenings'
import { Login } from './views/auth/Login'
import { Register } from './views/auth/Register'
import { Provider } from 'react-redux'
import store from './store/store'
import { IoMdClose } from 'react-icons/io'

function App() {
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const handleLoginClose = () => {
        setLoginSuccess(false)
    }

    const handleRegisterClose = () => {
        setRegisterSuccess(false)
    }

    return (
        <Provider store={store}>
            <Layout>
                <Routes>
                    <Route path='/' element={<Movies />} />
                    <Route path='/movies' element={<Movies />}>
                        <Route path='/movies/:mid' element={<Movie />} />
                        <Route path='/movies/:mid/screenings/:sid' element={<Movies />} />
                    </Route>
                    <Route path='/bookings' element={<Bookings />}>
                        <Route path='/bookings/:bid' element={<Booking />} />
                    </Route>
                    <Route >
                        <Route path='/manage/movies' element={<ManageMovies />} />
                        <Route path='/manage/screenings' element={<ManageScreenings />} />
                    </Route>
                    <Route >
                        <Route path='/auth/login' element={<Login setLoginSuccess={setLoginSuccess} />}/>
                        <Route path='/auth/register' element={<Register setRegisterSuccess={setRegisterSuccess} />}/>
                    </Route>
                </Routes>
            </Layout>
            {loginSuccess && <div className="toast" id='successToast'>
                <div className="alert alert-success">
                <span>Login successful!</span>
                <button className='btn btn-ghost' onClick={handleLoginClose}><IoMdClose /></button>
                </div>
            </div>}
            {registerSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Registration successful!</span>
                <button className='btn btn-ghost' onClick={handleRegisterClose}><IoMdClose /></button>
                </div>
            </div>}
        </Provider>
    )
}

export default App
