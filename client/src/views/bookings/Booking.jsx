import React from 'react'
import { useGetSingleMovieQuery, useGetSingleScreeningQuery } from '../../store/moviesApi'

export const Booking = ({booking}) => {
    const screening = booking.screening
    const movie = screening.movie

    const dateOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric'
    }

    const startTime = new Date(Date.parse(screening.start_time))
    startTime.setTime(startTime.getTime() - 2 * 60 * 60 * 1000)
    const now = new Date()

    console.log(startTime.getDate() < now.getDate())
    console.log(startTime.getDate() == now.getDate())
    console.log(startTime.getTime() < now.getTime())

    return (
        <>
            <div className='grid grid-cols-2 rounded-xl h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-80'>
                <div className='grid grid-cols-1 text-left'>
                    <h2 className='text-xl font-bold'>{movie.title}</h2>
                    <span>{new Date(screening.date).toLocaleDateString('hu-HU', dateOptions)}</span>
                    <div className='grid grid-cols-2'>
                        <span>{new Date(Date.parse(startTime)).toLocaleTimeString('en-GB', timeOptions)}</span>
                        <span>{movie.duration} mins</span>
                    </div>
                    <div className='grid grid-cols-1'>
                        {
                            booking.seats.map((seat, index) => (
                                <span key={index}>Row {seat.row} Seat {seat.seat}</span>
                            ))
                        }
                    </div>
                </div>
                <img src={movie.image_path} className='h-50 rounded-xl' style={{filter: startTime < now ? 'grayscale(100%)' : ''}} />
            </div>
        </>
    )
}