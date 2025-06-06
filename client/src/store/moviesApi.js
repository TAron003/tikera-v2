import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accessToken = JSON.parse(localStorage.getItem('user'))?.data.token.split('|')[1] ?? null

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('Authorization', `Bearer ${accessToken}`)
            return headers
        },
     }),
    endpoints: (build) => ({
        getAllMovies: build.query({
            query: () => ({
                url: `movies`,
                method: 'GET',
            }),
            providesTags: ['Movies']
        }),
        getSingleMovie: build.query({
            query: (id) => ({
                url: `movies/${id}`,
                method: 'GET',
            })
        }),
        getMoviesByWeek: build.query({
            query: (week) => ({
                url: `movies/week?week_number=${week}`,
                method: 'GET',
            })
        }),
        getSingleScreening: build.query({
            query: (id) => ({
                url: `screenings/${id}`,
                method: 'GET',
            })
        }),
        getAllScreenings: build.query({
            query: () => ({
                url: `screenings`,
                method: 'GET',
            }),
            providesTags: ['Screenings']
        }),
        createMovie: build.mutation({
            query: (movie) => ({
                url: `movies`,
                method: 'POST',
                body: movie,
            }),
            invalidatesTags: ['Movies']
        }),
        updateMovie: build.mutation({
            query: ({id, movie}) => ({
                url: `movies/${id}`,
                method: 'PUT',
                body: movie,
            }),
            invalidatesTags: ['Movies']
        }),
        deleteMovie: build.mutation({
            query: (id) => ({
                url: `movies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Movies']
        }),
        createScreening: build.mutation({
            query: (screening) => ({
                url: `screenings`,
                method: 'POST',
                body: screening,
            }),
            invalidatesTags: ['Screenings']
        }),
        updateScreening: build.mutation({
            query: ({id, screening}) => ({
                url: `screenings/${id}`,
                method: 'PUT',
                body: screening,
            }),
            invalidatesTags: ['Screenings']
        }),
        deleteScreening: build.mutation({
            query: (id) => ({
                url: `screenings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Screenings']
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetAllMoviesQuery, 
    useGetSingleMovieQuery, 
    useGetMoviesByWeekQuery, 
    useGetSingleScreeningQuery, 
    useGetAllScreeningsQuery, 
    useCreateMovieMutation, 
    useUpdateMovieMutation, 
    useDeleteMovieMutation, 
    useCreateScreeningMutation, 
    useUpdateScreeningMutation, 
    useDeleteScreeningMutation 
} = moviesApi