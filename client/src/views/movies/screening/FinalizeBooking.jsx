import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useCreateBookingMutation } from '../../../store/userApi'
import { book } from '../../../store/movieSlice'
import { IoMdClose } from "react-icons/io";

export const FinalizeBooking = ({setBookingSuccess}) => {
    const [bookingFail, setBookingFail] = useState(false)
    const selectedScreening = useSelector(state => state.movie.selectedScreening)
    const pricings = useSelector(state => state.movie.pricings)
    const tickets = pricings.filter(pricing => pricing.count > 0)
    const total = useSelector(state => state.movie.total)
    const selected = []
    const selectedSeats = useSelector(state => state.movie.selectedSeats)
    selectedSeats.map(seat => selected.push([`Row ${seat[0] + 1} Seat ${seat[1] + 1}`]))
    const isLoggedIn = useSelector(state => state.movie.isLoggedIn)
    const navigate = useNavigate()
    const [createBooking, {isLoading, isError, error, isSuccess, data}] = useCreateBookingMutation()
    const dispatch = useDispatch()

    const handleClickLogin = () => {
        navigate('/auth/login')
    }

    const handleBooking = () => {
        if(selectedSeats.length == total.count)
        {
            const seats = []
            selectedSeats.map(seat => seats.push({row: seat[0] + 1, number: seat[1] + 1}))
            const ticketTypes = []
            tickets.map(ticket => ticketTypes.push({type: ticket.type, quantity: ticket.count}))
            const booking = {
                screening_id: selectedScreening.id,
                seats: seats,
                ticket_types: ticketTypes
            }
            console.log(booking)
            console.log(JSON.stringify(booking))
            createBooking(booking)
        }
    }

    const handleBookingClose = () => {
        setBookingFail(false)
    }

    useEffect(() => {
        if(isSuccess)
        {
            dispatch(book())
            navigate('/movies')
            console.log("Successful booking: ", data)
            setBookingSuccess(true)
        }
    }, [isSuccess, data, dispatch, setBookingSuccess])

    useEffect(() => {
        if(isError)
        {
            console.log("Error: ", error)
            setBookingFail(true)
        }
    }, [isError, error])

    return (
        <>
            {bookingFail && <div className="toast" id='toast-error'>
                <div className="alert alert-error">
                <span>Booking failed. {error.data.message}</span>
                <button className="btn btn-ghost" onClick={handleBookingClose}>
                    <IoMdClose />
                </button>
                </div>
            </div>}
            {
                tickets.map((ticket, i) =>
                    <section key={i} className="grid grid-cols-3">
                        <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">{ticket.name}</h3>
                        <p className="text-md text-center m-auto">{ticket.count}</p>
                        <p className="text-md text-right m-auto mr-2.5">{ticket.total} Ft</p>
                    </section>
                )
            }
            {
                total.count == 0 ? <></> :
                <section className="grid grid-cols-3">
                    <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Total</h3>
                    <p className="text-md text-center m-auto">{total.count}</p>
                    <p className="text-md text-right m-auto mr-2.5">{total.price} Ft</p>
                </section>
            }
            {
                selected.length == 0 ? <></> :
                <>
                    <h3 className="text-lg text-left mt-1 mb-1 ml-2.5">Seats</h3>
                    <ul className="text-md text-left ml-2.5">
                        {
                            selected.map((seat, i) => 
                                <li key={i} className="mt-1 mb-1 ml-2.5">{seat}</li>
                            )
                        }
                    </ul>
                </>
            }
            {
                selected.length < total.count || total.count == 0 ? <></> :
                (isLoggedIn ? 
                <button className="btn btn-ghost bg-cyan-800 rounded-xl m-auto mt-2.5 p-2.5 text-center" onClick={handleBooking}>Finalize booking</button>
                : 
                <button className="btn btn-ghost bg-cyan-800 rounded-xl m-auto mt-2.5 p-2.5 text-center" onClick={handleClickLogin}>Login or register</button>
                )
            }
        </>
    )
}