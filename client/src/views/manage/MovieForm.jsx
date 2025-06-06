import React, { useState, useEffect } from 'react'

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
    )
}