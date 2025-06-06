import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setScreening } from '../../store/movieSlice'
import { SelectTicket } from './screening/SelectTicket'

export const Movie = () => {
    const dispatch = useDispatch()
    const selectedMovie = useSelector(state => state.movie.selectedMovie)
    const weekDay = useSelector(state => state.movie.selectedDay)
    const screenings = selectedMovie?.screenings.filter(screening => screening.week_day == weekDay)

    const selectedScreening = useSelector(state => state.movie.selectedScreening)

    const handleClick = (screening) => {
        dispatch(setScreening(screening))
    }

    return (
        <>
            <div className="grid grid-cols-2 p-2.5 m-2.5 bg-slate-700 rounded-xl lg:flex-row" style={{display: selectedMovie == null ? 'none' : 'block'}}>
                {selectedMovie == null ? <></> : <>
                    <img src={selectedMovie.image_path} className="rounded-xl h-100 m-auto mt-2.5 mb-2.5"/>
                    <div className="grid grid-cols-1 text-left h-fit p-2.5">
                        <h2 className="text-2xl">{selectedMovie.title}</h2>
                        <aside>{selectedMovie.release_year} | {selectedMovie.genre} | {selectedMovie.duration} minutes</aside>
                        <p className="pt-2.5 pb-2.5">
                            {selectedMovie.description}
                        </p>
                        <div className="grid grid-cols-5">
                            {screenings.map((screening, i) => 
                                <button key={i} id={`screening${i}`} onClick={() => handleClick(screening)} className={screening.bookings.length < screening.room.rows * screening.room.seatsPerRow ? `btn btn-ghost bg-green-600 rounded-xl p-1.5 pt-1 pb-1 m-auto mb-2.5 w-fit h-fit ${screening == selectedScreening ? 'btn-active bg-teal-600' : ''}` : "btn btn-ghost bg-green-950 rounded-xl p-0.5 m-auto ml-2.5 mb-2.5 w-15"}>
                                    {screening.start_time}
                                </button>
                            )}
                        </div>
                        {
                            selectedScreening == null ? <></> : 
                            <SelectTicket />
                        }
                    </div></>
                }
            </div>
        </>
    )
}