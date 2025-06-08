import React, { useState, useEffect } from 'react'
import { Days } from './Days'
import { Movie } from './Movie'
import { Screening } from './Screening'
import { useGetMoviesByWeekQuery } from '../../store/moviesApi'
import { useDispatch } from 'react-redux'
import { setMovie, setScreening } from '../../store/movieSlice'
import { useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'

export const Movies = () => {
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()
    const weekNumber = useSelector(state => state.movie.selectedWeek)
    const weekDay = useSelector(state => state.movie.selectedDay)
    const selectedMovie = useSelector(state => state.movie.selectedMovie)
    const { data, isLoading, isError, error } = useGetMoviesByWeekQuery(weekNumber)

    const bookingModal = document.getElementById('booking-modal')

    useEffect(() => {
        if (bookingModal) {
            if (selectedMovie && window.innerWidth < 1024)
                setModalOpen(true)
            else
                setModalOpen(false)
        }
    }, [selectedMovie, bookingModal, window.innerWidth])

    useEffect(() => {
        if (bookingModal) {
            if (modalOpen)
                bookingModal.showModal()
            else
                bookingModal.close()
        }
    }, [modalOpen])

    if (isLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isError) return <span>Error</span>

    console.log(data)

    const movies = data.data.filter(
        movie => movie.screenings.some(screening => screening.week_number == weekNumber && screening.week_day == weekDay)
    )

    console.log(movies)

    const handleClick = (movie) => {
        dispatch(setMovie(movie))
    }

    const handleClickClose = () => {
        dispatch(setMovie(null))
        dispatch(setScreening(null))
    }

    const handleBookingClose = () => {
        setBookingSuccess(false)
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 overflow-y-auto'>
            <div className='h-fit'>
                <Days />
                <div className='grid grid-cols-1 sm:grid-cols-3'>
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
            <div className='h-fit hidden xl:block'>
                <Movie />
                <Screening setBookingSuccess={setBookingSuccess} />
            </div>
            <dialog id="booking-modal" className='modal fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50 block xl:hidden'>
                <span className="absolute border-0 cursor-pointer top-4 right-4" onClick={handleClickClose}><IoMdClose /></span>
                <div className='modal-box bg-slate-700 rounded-xl m-auto mt-2.5 mb-2.5 p-2.5'>
                    <Movie />
                    <Screening setBookingSuccess={setBookingSuccess} />
                </div>
            </dialog>
            {bookingSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Booking successful!</span>
                <button onClick={handleBookingClose} className="btn btn-ghost ms-auto -mx-1.5 -my-1.5 text-gray-400 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500" data-dismiss-target="#toast-default" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <IoMdClose />
                </button>
                </div>
            </div>}
        </div>
    )
}