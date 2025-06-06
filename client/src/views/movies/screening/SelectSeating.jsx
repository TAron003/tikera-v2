import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSeats } from '../../../store/movieSlice'

export const SelectSeating = () => {
    const selectedScreening = useSelector(state => state.movie.selectedScreening)
    const rows = selectedScreening.room.rows
    const seatsPerRow = selectedScreening.room.seatsPerRow
    const seating = useSelector(state => state.movie.seating)
    const selectedSeats = useSelector(state => state.movie.selectedSeats)
    const ticketCount = useSelector(state => state.movie.total.count)
    const dispatch = useDispatch()

    const handleClick = (i, j) => {
        if(selectedSeats.length < ticketCount && seating[i][j] == 0 || seating[i][j] == 1)
            dispatch(setSeats([i, j]))
    }

    return (
        <>
            <div className={seating.length == 10 ? "grid grid-cols-10 w-fit h-fit m-auto mt-2.5" : "grid grid-cols-8 w-fit h-fit m-auto mt-2.5"}>
                {
                    seating.map((row, i) => 
                        row.map((seat, j) => 
                            <button key={i * rows + j} id={`seat${i * rows + j}`} className={seat == 2 ? "bg-green-950 p-0.5 m-1 rounded-md" : (seat == 1 ? "bg-teal-600  p-0.5 m-1 rounded-md" : "bg-green-600  p-0.5 m-1 rounded-md")} onClick={() => handleClick(i, j)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-armchair-icon lucide-armchair"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
                            </button>
                        )
                    )
                }
            </div>
        </>
    )
}