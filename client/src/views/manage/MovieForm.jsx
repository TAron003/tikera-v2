import React, { useState, useEffect } from 'react'
import { MdFileUpload } from "react-icons/md"
import { IoMdClose } from 'react-icons/io'

export const MovieForm = ({ edit, setIsEditing, handleSubmit }) => {
    const defaultData = {
        title: 'Thunderbolts*',
        description: 'A group of anti-heroes have to face with a foe who is far beyond their powers and try to save the world from destruction.',
        duration: 127,
        genre: 'Action',
        release_year: 2025,
        image_path: "https://api-tikera.codence.hu/public/storage/movies/default.jpg"
    }
    const [formData, setFormData] = useState(edit ?? defaultData)
    

    useEffect(() => {
        setFormData(edit ?? defaultData)
    }, [edit])

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    return (
        <dialog className='modal fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='grid grid-cols-1 p-2.5 m-2.5 bg-slate-700 rounded-xl lg:flex-row text-left'>
                <h2 className='text-xl'>{edit == null ? 'Add movie' : 'Edit movie'}</h2>
                <form className='grid grid-cols-1'>
                    <label htmlFor="title">Title</label>
                    <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="text" name="title" id="title" value={formData.title} onInput={handleInput} />
                    <label htmlFor="description">Description</label>
                    <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="text" name="description" id="description" value={formData.description} onInput={handleInput} />
                    <label htmlFor="duration">Duration</label>
                    <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="number" name="duration" id="duration" value={formData.duration} onInput={handleInput} />
                    <label htmlFor="genre">Genre</label>
                    <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="text" name="genre" id="genre" value={formData.genre} onInput={handleInput} />
                    <label htmlFor="release_year">Release year</label>
                    <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="number" name="release_year" id="release_year" value={formData.release_year} onInput={handleInput} />
                    <label htmlFor="image_path">Image path</label>
                    <input className='input input-bordered w-full p-2.5 m-auto mt-1.5 mb-1.5' type="url" name="image_path" id="image_path" value={formData.image_path} onInput={handleInput} />
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
        </dialog>
        
    )
}