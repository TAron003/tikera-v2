import React from 'react'
import { useSelector } from 'react-redux'
import { ScreeningDetails } from './screening/ScreeningDetails'
import { SelectSeating } from './screening/SelectSeating'
import { FinalizeBooking } from './screening/FinalizeBooking'

export const Screening = ({setBookingSuccess}) => {
    const selectedScreening = useSelector(state => state.movie.selectedScreening)

    return (
        <>
            {
                selectedScreening == null ? <></> : 
                <div className="grid grid-cols-1 lg:grid-cols-2 w-fit h-fit p-1 pr-2.5 m-auto mt-2.5 mb-2.5 bg-slate-700 rounded-xl">
                    <div className="block lg:hidden">
                        <ScreeningDetails />
                        <SelectSeating />
                        <FinalizeBooking setBookingSuccess={setBookingSuccess} />
                    </div>
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-1">
                            <ScreeningDetails />
                            <FinalizeBooking setBookingSuccess={setBookingSuccess} />
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <SelectSeating />
                    </div>
                </div>
            }
        </>
    )
}