import React from 'react'
import { useSelector } from 'react-redux'

export const ScreeningDetails = () => {
    const selectedMovie = useSelector(state => state.movie.selectedMovie)
    const selectedScreening = useSelector(state => state.movie.selectedScreening)
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const day = useSelector(state => state.movie.selectedDay)
    return (
        <>
            {
                <div className="grid grid-cols-2 h-fit mr-2.5 mb-2.5">
                    <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Movie</h3>
                    <p className="text-md text-right m-auto mr-2.5">{selectedMovie.title}</p>
                    <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Day</h3>
                    <p className="text-md text-right m-auto mr-2.5">{days[day - 1]}</p>
                    <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Start time</h3>
                    <p className="text-md text-right m-auto mr-2.5">{selectedScreening.start_time}</p>
                    <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Duration</h3>
                    <p className="text-md text-right m-auto mr-2.5">{selectedMovie.duration} minutes</p>
                </div>
            }
            
        </>
    )
}