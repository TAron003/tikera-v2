import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

function getWeek() {
    
    const dt = new Date()
    const ys = new Date(dt.getFullYear(), 0, 1)
    const dp = Math.floor((dt - ys) / 86400000)
    const sw = ys.getDay()
    const so = (sw === 0) ? 6 : sw - 1
    const wn = Math.floor((dp + so) / 7) + 1

    return wn;
}

function getDay() {
    
    const dt = new Date()
    const dn = dt.getDay() == 0 ? 7 : dt.getDay()

    return dn;
}
const pricings = [
    {
        name: 'Adult',
        type: "normal",
        price: 2500,
        count: 0
    },
    {
        name: 'Student',
        type: "student",
        price: 2000,
        count: 0
    },
    {
        name: 'Senior',
        type: "senior",
        price: 1800,
        count: 0
    }
]

const total = {price: 0, count: 0}

const initialState = {
    selectedWeek: localStorage.getItem('week') ? JSON.parse(localStorage.getItem('week')) : getWeek(),
	selectedDay: localStorage.getItem('day') ? JSON.parse(localStorage.getItem('day')) : getDay(),
    selectedMovie: localStorage.getItem('movie') ? JSON.parse(localStorage.getItem('movie')) : null,
    selectedScreening: localStorage.getItem('screening') ? JSON.parse(localStorage.getItem('screening')) : null,
    pricings: localStorage.getItem('pricings') ? JSON.parse(localStorage.getItem('pricings')) : pricings,
    total: localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : total,
    seating: localStorage.getItem('seating') ? JSON.parse(localStorage.getItem('seating')) : [],
    selectedSeats: localStorage.getItem('seats') ? JSON.parse(localStorage.getItem('seats')) : [],
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isLoggedIn: localStorage.getItem('user') ? true : false,
    isAdmin: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.data.user.role == 'admin' : null,
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setWeek(state, action) {
            state.selectedWeek = action.payload
            state.selectedScreening = null
            localStorage.setItem('week', JSON.stringify(state.selectedWeek))
        },
        setDay(state, action) {
            state.selectedDay = action.payload
            state.selectedScreening = null
            localStorage.setItem('day', JSON.stringify(state.selectedDay))
        },
        setMovie(state, action) {
            state.selectedMovie = action.payload
            state.selectedScreening = null
            localStorage.setItem('movie', JSON.stringify(state.selectedMovie))
        },
        setScreening(state, action) {
            state.selectedScreening = action.payload
            state.pricings = pricings
            state.total = total
            state.seating = []
            state.selectedSeats = []
            localStorage.setItem('screening', JSON.stringify(state.selectedScreening))
            const rows = state.selectedScreening?.room.rows
            const seatsPerRow = state.selectedScreening?.room.seatsPerRow
            const bookings = state.selectedScreening?.bookings
            const seating = state.selectedScreening == null ? [] : Array.from({length: rows}, () => Array.from({length: seatsPerRow}, () => 0))
            if(state.selectedScreening != null)
            {
                for(let r = 0; r < rows; r++)
                {
                    for(let s = 0; s < seatsPerRow; s++)
                    {
                        if(bookings.filter(booking => booking.row == r + 1 && booking.seat == s + 1).length != 0)
                            seating[r][s] = 2
                    }
                }
            }
            state.seating = seating
            localStorage.setItem('seating', JSON.stringify(state.seating))
        },
        setPricings(state, action) {
            console.log(action.payload)
            const i = action.payload.index
            console.log(i)
            const diff = action.payload.count - state.pricings[i].count
            state.pricings[i].count += diff
            state.total.count += diff
            state.total.price += diff * state.pricings[i].price
            localStorage.setItem('pricings', JSON.stringify(state.pricings))
            localStorage.setItem('total', JSON.stringify(state.total))
        },
        setSeats(state, action) {
            console.log(action.payload)
            if(state.seating[action.payload[0]][action.payload[1]] == 1)
            {
                state.selectedSeats.pop(action.payload)
                state.seating[action.payload[0]][action.payload[1]] = 0
            }
            else
            {
                state.selectedSeats.push(action.payload)
                state.seating[action.payload[0]][action.payload[1]] = 1
            }
            localStorage.setItem('seats', JSON.stringify(state.selectedSeats))
        },
        setUser(state, action) {
            state.user = action.payload
            state.isLoggedIn = true
            state.isAdmin = action.payload.data.user.role == 'admin'
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logOut(state) {
            state.user = null
            state.isLoggedIn = false
            state.isAdmin = null
            state.selectedWeek = getWeek()
            state.selectedDay = getDay()
            state.selectedMovie = null
            state.selectedScreening = null
            state.pricings = pricings
            state.total = total
            state.seating = []
            state.selectedSeats = []
            localStorage.removeItem('week')
            localStorage.removeItem('day')
            localStorage.removeItem('movie')
            localStorage.removeItem('screening')
            localStorage.removeItem('pricings')
            localStorage.removeItem('total')
            localStorage.removeItem('seating')
            localStorage.removeItem('seats')
            localStorage.removeItem('user')
        },
        book(state) {
            state.selectedWeek = getWeek()
            state.selectedDay = getDay()
            state.selectedMovie = null
            state.selectedScreening = null
            state.pricings = pricings
            state.total = total
            state.seating = []
            state.selectedSeats = []
            localStorage.removeItem('week')
            localStorage.removeItem('day')
            localStorage.removeItem('movie')
            localStorage.removeItem('screening')
            localStorage.removeItem('pricings')
            localStorage.removeItem('total')
            localStorage.removeItem('seating')
            localStorage.removeItem('seats')
        },
        reset(state) {
            state.selectedWeek = getWeek()
            state.selectedDay = getDay()
            state.selectedMovie = null
            state.selectedScreening = null
            state.pricings = pricings
            state.total = total
            state.seating = []
            state.selectedSeats = []
            localStorage.removeItem('week')
            localStorage.removeItem('day')
            localStorage.removeItem('movie')
            localStorage.removeItem('screening')
            localStorage.removeItem('pricings')
            localStorage.removeItem('total')
            localStorage.removeItem('seating')
            localStorage.removeItem('seats')
        }
    },
})

export const { setDay, setMovie, setScreening, setWeek, setPricings, setSeats, setUser, setAdmin, logOut, book, reset } = movieSlice.actions

export default movieSlice.reducer