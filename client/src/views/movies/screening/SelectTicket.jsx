import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { setPricings } from '../../../store/movieSlice';

export const SelectTicket = () => {
    const pricings = useSelector(state => state.movie.pricings)
    const selectedScreening = useSelector(state => state.movie.selectedScreening)
    const dispatch = useDispatch()
    const availableSeats = selectedScreening.room.rows * selectedScreening.room.seatsPerRow - selectedScreening.bookings.length
    const total = useSelector(state => state.movie.total)
    console.log(availableSeats)

    const handleClickInc = (i) => {
        let count = 0
        pricings.map(pricing => count += pricing.count)
        console.log(count)

        if(count < availableSeats)
        {
            const inp = document.querySelector(`#Tickets${i}`)
            inp.value++
            console.log(inp.value)
            dispatch(setPricings({index: i, type: pricings[i].type, count: inp.value}))
        }
        console.log(pricings[i])
    }

    const handleClickDec = (i) => {
        if(pricings[i].count > 0)
        {
            const inp = document.querySelector(`#Tickets${i}`)
            inp.value--
            dispatch(setPricings({index: i, type: pricings[i].type, count: inp.value}))
        }
    }

    const handleChange = (e) => {
        const i = parseInt(e.target.id.slice(-1)[0])
        console.log(i)
        if(e.target.value > availableSeats)
            e.target.value = availableSeats
        dispatch(setPricings({index: i, type: pricings[i].type, count: e.target.value}))
        
    }

    return (
        <>
            {
                total.count == availableSeats ? 
                <aside className="text-sm text-red-600 text-left">
                    Screening's maximum capacity is reached
                </aside>
                : <></> 
            }
            {
                pricings.map((pricing, i) => 
                    <form key={i} className="grid grid-cols-3">
                        <label htmlFor={`Tickets${i}`} className="grid grid-cols-1 mt-1 mb-1 ml-2.5">
                            <h3 className="text-lg text-left">{pricing.name}</h3>
                            <aside className="text-sm text-left">{`${pricing.price} Ft/db`}</aside>
                        </label>
                        <div className="relative flex items-center self-center m-auto mt-1 mb-1">
                            <button type="button" id="decrement-button" onClick={() => handleClickDec(i)} className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <FaMinus />
                            </button>
                            <input type="text" id={`Tickets${i}`} className="shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder={pricing.count} value={pricing.count} min='0' max={availableSeats} required onChange={(e) => handleChange(e)} />
                            <button type="button" id="increment-button" onClick={() => handleClickInc(i)} className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <FaPlus />
                            </button>
                        </div>
                        <p id={`${pricing.type}Total`} className="text-right m-auto mr-2.5">{pricing.count * pricing.price} Ft</p>
                    </form>
                )
            }
            <section className="grid grid-cols-3">
                <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Total: </h3>
                <p id="ticketCount" className="text-center m-auto">{total.count}</p>
                <p id="total" className="text-right m-auto mr-2.5">{total.price} Ft</p>
            </section>
        </>
    )
}