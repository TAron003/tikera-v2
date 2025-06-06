import React from 'react'
import { useState } from 'react'
import { useGetAllMoviesQuery } from '../../store/moviesApi'

export const ScreeningForm = ({edit, setIsEditing, handleSubmit}) => {
    const {data: movieData, isLoading: isMoviesLoading, isError: isMoviesError} = useGetAllMoviesQuery()
    if (isMoviesLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isMoviesError) return <span>Error</span>

    const movies = movieData?.data
    
    const defaultData = {
        movie_id: movies[0].id,
        room_id: 1,
        date: new Date().toISOString().split('T')[0],
        start_time: '20:00',
    }
    const [formData, setFormData] = useState(edit ?? defaultData)

    console.log(formData)

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                <div className='grid grid-cols-1 p-2.5 m-2.5 bg-slate-700 rounded-xl lg:flex-row max-w-md w-full'>
                    <h2 className='text-xl'>{edit == null ? 'Add screening' : 'Edit screening'}</h2>
                    <form className='grid grid-cols-1'>
                        <label htmlFor="title">Movie</label>
                        <fieldset className="fieldset fieldset-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5">
                            <select defaultValue={formData.movie_id} name="movie_id" id="movie_id" className="select" onChange={handleInput}>
                                <option disabled={true}>Pick a movie</option>
                                {
                                    movies.map(movie => <option key={movie.id} value={movie.id}>{movie.title}</option>)
                                }
                            </select>
                        </fieldset>
                        {edit == null ?
                            <><label htmlFor="description">Room</label>
                            <fieldset className="fieldset fieldset-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5">
                                <select defaultValue={formData.room_id} name="room_id" id="room_id" className="select" onChange={handleInput}>
                                    <option disabled={true}>Pick a room</option>
                                    <option value={1}>Grand Hall</option>
                                    <option value={2}>Small Theater</option>
                                </select>
                            </fieldset>
                            </> : <></>
                        }
                        <label htmlFor="duration">Date</label>
                        <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="date" name="date" id="date" value={formData.date} onChange={handleInput} />
                        <label htmlFor="genre">Start time</label>
                        <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="time" name="start_time" id="start_time" value={formData.start_time} onChange={handleInput} />
                        <div className='grid grid-cols-2'>
                            <button className='btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700' onClick={(e) => handleSubmit(e, formData, edit)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                </svg> Save
                            </button>
                            <button className='btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700' onClick={() => setIsEditing(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}