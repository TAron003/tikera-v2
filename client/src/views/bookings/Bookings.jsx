import React from 'react'
import { useGetUserBookingsQuery } from '../../store/userApi'
import { Booking } from './Booking'

export const Bookings = () => {
    const {data, isLoading, isError} = useGetUserBookingsQuery()
    if (isLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isError) return <span>Error</span>

    const bookings = data?.data
    const sortedBookings = [...bookings].sort((a, b) => new Date(a.screening.start_time) - new Date(b.screening.start_time))
    
    return (
        <>
            <div className="grid grid-cols-4">
                {
                    sortedBookings.map(booking =>
                        <Booking booking={booking} key={booking.id} />
                    )
                }
            </div>
        </>
    )
}