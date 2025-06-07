import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accessToken = JSON.parse(localStorage.getItem('accessToken')) ?? null
const apiURL = import.meta.env.VITE_API_URL

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${apiURL}api/`,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${accessToken}`)
            return headers
        },
     }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (user) => ({
                url: `register`,
                method: 'POST',
                body: user
            })
        }),
        login: build.mutation({
            query: (user) => ({
                url: `login`,
                method: 'POST',
                body: user
            })
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = authApi