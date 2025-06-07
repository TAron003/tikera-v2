import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDay, setWeek, setMovie, setScreening } from '../../store/movieSlice'

export const Days = () => {
    const dispatch = useDispatch()
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const weekNumber = useSelector(state => state.movie.selectedWeek)
    const weekDay = useSelector(state => state.movie.selectedDay)

    const handleClick = (day) => {
        dispatch(setMovie(null))
        dispatch(setScreening(null))
        dispatch(setDay(day + 1))
    }

    const handleClickDec = () => {
        dispatch(setMovie(null))
        dispatch(setScreening(null))
        dispatch(setWeek(weekNumber - 1))
    }

    const handleClickInc = () => {
        dispatch(setMovie(null))
        dispatch(setScreening(null))
        dispatch(setWeek(weekNumber + 1))
    }

    const handleChange = (e) => {
        dispatch(setMovie(null))
        dispatch(setScreening(null))
        dispatch(setWeek(parseInt(e.target.value)))
    }

    return (
        <>
            <div className='grid grid-cols-7'>
                {
                    days.map((d, i) => 
                        <button key={i} className={`btn btn-ghost rounded-xl ${weekDay == i + 1 ? 'btn-active' : ''}`} onClick={() => handleClick(i)}>
                            {d}
                        </button>
                    )
                }
            </div>
            <div className="items-center self-center m-auto mt-1 mb-1">
                <button type="button" id="decrement-button" onClick={handleClickDec} className="btn btn-ghost btn-circle">
                    {'<'}
                </button>
                <input type="text" id='week' className="shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder={weekNumber} value={weekNumber} min='1' max='54' required onChange={(e) => handleChange(e)}/>
                <button type="button" id="increment-button" onClick={handleClickInc} className="btn btn-ghost btn-circle">
                    {'>'}
                </button>
            </div>
        </>
    )
}