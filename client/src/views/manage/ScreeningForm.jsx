import React from 'react'
import { useState } from 'react'
import { useGetAllMoviesQuery } from '../../store/moviesApi'
import { MdFileUpload } from "react-icons/md"
import { IoMdClose } from 'react-icons/io'

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
                                <MdFileUpload /> Save
                            </button>
                            <button className='btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700' onClick={() => setIsEditing(false)}>
                                <IoMdClose /> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}