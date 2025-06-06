import React, { useState } from 'react'
import { Days } from './Days'
import { Movie } from './Movie'
import { Screening } from './Screening'
import { useGetMoviesByWeekQuery } from '../../store/moviesApi'
import { useDispatch } from 'react-redux'
import { setMovie } from '../../store/movieSlice'
import { useSelector } from 'react-redux'

export const Movies = () => {
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const dispatch = useDispatch()
    const weekNumber = useSelector(state => state.movie.selectedWeek)
    const weekDay = useSelector(state => state.movie.selectedDay)
    const { data, isLoading, isError, error } = useGetMoviesByWeekQuery(weekNumber)
    if (isLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isError) return <span>Error</span>

    const movies = data.data.filter(
        movie => movie.screenings.some(screening => screening.week_number == weekNumber && screening.week_day == weekDay)
    )

    const handleClick = (movie) => {
        dispatch(setMovie(movie))
    }

    const handleBookingClose = () => {
        setBookingSuccess(false)
    }

    return (
        <div className='grid grid-cols-2'>
            <div className='h-fit'>
                <Days />
                <div className='grid grid-cols-3'>
                {
                    movies.map(movie => 
                        <div key={movie.id - 1} id={`movie${movie.id}`} onClick={() => handleClick(movie)} className="grid grid-cols-1 btn btn-ghost h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-45">
                            <img src={movie.image_path} className="rounded-xl h-50 m-auto mt-2.5 mb-2.5"/>
                            <div className="grid grid-cols-1">
                                <p>{movie.title}</p>
                                <div className="grid grid-cols-2">
                                    <aside>{movie.genre}</aside>
                                    <aside>{`${movie.duration} mins`}</aside>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
            <div className='h-fit'>
                <Movie />
                <Screening setBookingSuccess={setBookingSuccess} />
            </div>
            {bookingSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Booking successful!</span>
                <button onClick={handleBookingClose} className="btn btn-ghost ms-auto -mx-1.5 -my-1.5 text-gray-400 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500" data-dismiss-target="#toast-default" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
        </div>
    )
}