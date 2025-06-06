import React, { useState, useEffect } from 'react'
import { useGetAllMoviesQuery, useCreateMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation } from '../../store/moviesApi'
import { MovieForm } from './MovieForm'
import { useSelector } from 'react-redux'
import { setMovie } from '../../store/movieSlice'
import { useDispatch } from 'react-redux'

export const ManageMovies = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [edit, setEdit] = useState(null)
    const [addSuccess, setAddSuccess] = useState(false)
    const [addFail, setAddFail] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateFail, setUpdateFail] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteFail, setDeleteFail] = useState(false)
    const selectedMovie = useSelector(state => state.movie.selectedMovie)
    const dispatch = useDispatch()
    const [createMovie, {isSuccess: isAddSuccess, isLoading: isAddLoading, isError: isAddError, error: errorAdd, data: dataAdd}] = useCreateMovieMutation()
    const [updateMovie, {isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate, data: dataUpdate}] = useUpdateMovieMutation()
    const [deleteMovie, {isSuccess: isDeleteSuccess, isLoading: isDeleteLoading, isError: isDeleteError, error: errorDelete, data: dataDelete}] = useDeleteMovieMutation()
    const {data, isLoading, isError} = useGetAllMoviesQuery()
    
    useEffect(() => {
        if (isAddSuccess) {
            console.log("Movie added successfully: ", dataAdd)
            setIsEditing(false)
            setAddSuccess(true)
        }
    }, [isAddSuccess, dataAdd, setIsEditing])

    useEffect(() => {
        if (isAddError) {
            setAddFail(true)
        }
    }, [isAddError])

    useEffect(() => {
        if (isUpdateSuccess) {
            console.log("Movie updated successfully: ", dataUpdate)
            setIsEditing(false)
            setEdit(null)
            setUpdateSuccess(true)
        }
    }, [isUpdateSuccess, dataUpdate, setIsEditing, setEdit])

    useEffect(() => {
        if (isUpdateError) {
            setUpdateFail(true)
        }
    }, [isUpdateError])

    useEffect(() => {
        if (isDeleteSuccess) {
            console.log("Movie deleted successfully: ", dataDelete)
            setIsEditing(false)
            dispatch(setMovie(null))
            setDeleteSuccess(true)
        }
    }, [isDeleteSuccess, dataDelete, setIsEditing])

    useEffect(() => {
        if (isDeleteError) {
            setDeleteFail(true)
        }
    }, [isDeleteError])
    
    if (isLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isError) return <span>Error</span>
    const movies = data.data

    

    const handleClick = (movie) => {
        dispatch(setMovie(movie))
        setIsEditing(false)
    }

    const handleClickAdd = () => {
        dispatch(setMovie(null))
        setEdit(null)
        setIsEditing(true)
    }

    const handleClickEdit = () => {
        setEdit({
            title: selectedMovie.title,
            description: selectedMovie.description,
            duration: selectedMovie.duration,
            genre: selectedMovie.genre,
            release_year: selectedMovie.release_year,
            image_path: selectedMovie.image_path
        })
        setIsEditing(true)
    }

    const handleSubmit = (e, formData, edit) => {
        e.preventDefault()
        console.log(formData)
        if (edit == null)
        {
            createMovie(formData)
        }
        else
        {
            const id = selectedMovie.id
            const movie = formData
            updateMovie({ id, movie })
        }
            
    }

    const handleClickDelete = () => {
        deleteMovie(selectedMovie.id)
    }

    const handleAddClose = () => {
        setAddSuccess(false)
        setAddFail(false)
    }

    const handleUpdateClose = () => {
        setUpdateSuccess(false)
        setUpdateFail(false)
    }

    const handleDeleteClose = () => {
        setDeleteSuccess(false)
        setDeleteFail(false)
    }
    
    return (
        <>
            {addSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Movie added successfully!</span>
                <button className="btn btn-ghost" onClick={handleAddClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
            {addFail && <div className="toast">
                <div className="alert alert-error">
                <span>Error in adding movie!</span>
                <button className="btn btn-ghost" onClick={handleAddClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
            {updateSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Movie updated successfully!</span>
                <button className="btn btn-ghost" onClick={handleUpdateClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
            {updateFail && <div className="toast">
                <div className="alert alert-error">
                <span>Error in updating movie!</span>
                <button className="btn btn-ghost" onClick={handleUpdateClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
            {deleteSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Movie deleted successfully!</span>
                <button onClick={handleDeleteClose} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
            {deleteFail && <div className="toast">
                <div className="alert alert-error">
                <span>Error in deleting movie!</span>
                <button className="btn btn-ghost" onClick={handleDeleteClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
                </div>
            </div>}
            <div className='grid grid-cols-2'>
            <div className='h-fit'>
                <div className='grid grid-cols-3'>
                    <div id={`addMovie`} onClick={handleClickAdd} className="grid grid-cols-1 btn btn-ghost h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-45">
                        <img src='https://api-tikera.codence.hu/public/storage/movies/default.jpg' className="rounded-xl h-50 m-auto mt-2.5 mb-2.5"/>
                        <button className='btn btn-ghost rounded-xl m-auto mt-1.5 mb-1.5'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg> Add movie
                        </button>
                    </div>
                {
                    movies.map(movie => 
                        <div key={movie.id - 1} id={`movie${movie.id}`} onClick={() => handleClick(movie)} className="grid grid-cols-1 btn btn-ghost h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-45">
                            <img src={movie.image_path} className="rounded-xl h-50 m-auto mt-2.5 mb-2.5"/>
                            <div className="grid grid-cols-1">
                                <p>{movie.title}</p>
                                <div className="grid grid-cols-2">
                                    <aside>{movie.genre}</aside>
                                    <aside>{`${movie.duration} mins`}</aside>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
            <div className='h-fit'>
                {
                    selectedMovie == null ? <></> : 
                    <div className="grid grid-cols-2 p-2.5 m-2.5 bg-slate-700 rounded-xl lg:flex-row">
                        <img src={selectedMovie.image_path} className="rounded-xl h-100 m-auto mt-2.5 mb-2.5"/>
                        <div className="grid grid-cols-1 text-left h-fit p-2.5">
                            <h2 className="text-2xl">{selectedMovie.title}</h2>
                            <aside>{selectedMovie.release_year} | {selectedMovie.genre} | {selectedMovie.duration} minutes</aside>
                            <p className="pt-2.5 pb-2.5">
                                {selectedMovie.description}
                            </p>
                            <div className="grid grid-cols-2">
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={handleClickEdit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg> Edit
                                </button>
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={handleClickDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {
                    isEditing ? <MovieForm edit={edit} setIsEditing={setIsEditing} handleSubmit={handleSubmit} /> : <></>
                }
            </div>
        </div>
        </>
    )
}