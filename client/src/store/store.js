import { configureStore } from '@reduxjs/toolkit'
import { moviesApi } from './moviesApi'
import movieReducer from './movieSlice'
import { authApi } from './authApi'
import { userApi } from './userApi'

export default configureStore({
    reducer: {
        movie: movieReducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(moviesApi.middleware).concat(authApi.middleware).concat(userApi.middleware)
})