import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiURL = import.meta.env.VITE_API_URL

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${apiURL}api/`,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${getState().movie.accessToken}`)
            return headers
        },
     }),
    endpoints: (build) => ({
        getUserBookings: build.query({
            query: () => ({
                url: `bookings`,
                method: 'GET',
            }),
            providesTags: ['Bookings']
        }),
        createBooking: build.mutation({
            query: (booking) => ({
                url: 'bookings',
                method: 'POST',
                body: booking
            }),
            invalidatesTags: ['Movies', 'Bookings']
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserBookingsQuery, useCreateBookingMutation } = userApi