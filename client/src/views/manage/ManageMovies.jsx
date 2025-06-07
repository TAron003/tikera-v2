import React, { useState, useEffect } from 'react'
import { useGetAllMoviesQuery, useCreateMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation } from '../../store/moviesApi'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { IoMdAdd } from "react-icons/io"
import { MovieForm } from './MovieForm'
import { useSelector } from 'react-redux'
import { setMovie } from '../../store/movieSlice'
import { useDispatch } from 'react-redux'
import { IoMdClose } from 'react-icons/io'

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
    const {data, isSuccess: isMoviesSuccess, isLoading: isMoviesLoading, isError: isMoviesError} = useGetAllMoviesQuery()
    const [movieModal, setMovieModal] = useState(null)

    useEffect(() => {
        if(isMoviesSuccess)
            setMovieModal(document.getElementById("movieModal"))
    }, [isMoviesSuccess])

    useEffect(() => {
        if (isAddSuccess) {
            console.log("Movie added successfully: ", dataAdd)
            setIsEditing(false)
            setAddSuccess(true)
            movieModal.close()
        }
    }, [isAddSuccess, dataAdd, setIsEditing, movieModal])

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
            dispatch(setMovie(null))
            movieModal.close()
        }
    }, [isUpdateSuccess, dataUpdate, setIsEditing, setEdit, dispatch, movieModal])

    useEffect(() => {
        if (isUpdateError) {
            setUpdateFail(true)
        }
    }, [isUpdateError])

    useEffect(() => {
        if (isDeleteSuccess) {
            console.log("Movie deleted successfully.")
            setDeleteSuccess(true)
        }
    }, [isDeleteSuccess])

    useEffect(() => {
        if (isDeleteError) {
            setDeleteFail(true)
        }
    }, [isDeleteError])

    useEffect(() => {
        if(movieModal)
        {
            if (isEditing)
                movieModal.showModal()
            else
                movieModal.close()
        }
    }, [isEditing, movieModal])

    useEffect(() => {
        if (selectedMovie) {
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
    }, [selectedMovie, setEdit, setIsEditing])
    
    if (isMoviesLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isMoviesError) return <span>Error</span>
    const movies = data.data

    const handleClickAdd = () => {
        dispatch(setMovie(null))
        setEdit(null)
        setIsEditing(true)
        movieModal.showModal()
    }

    const handleClickEdit = (movie) => {
        dispatch(setMovie(movie))
    }

    const handleSubmit = (e, formData, edit) => {
        e.preventDefault()
        if (edit == null)
        {
            createMovie(formData)
        }
        else
        {
            const id = selectedMovie.id
            const movie = formData
            updateMovie({ id, movie })
            dispatch(setMovie(movies.find(movie => movie.id == id)))
        }
        movieModal.close()
    }

    const handleClickDelete = (id) => {
        deleteMovie(id)
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

    const handleClickClose = () => {
        dispatch(setMovie(null))
        setIsEditing(false)
        movieModal.close()
    }
    
    return (
        <>
            {addSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Movie added successfully!</span>
                <button className="btn btn-ghost" onClick={handleAddClose}><IoMdClose /></button>
                </div>
            </div>}
            {addFail && <div className="toast">
                <div className="alert alert-error">
                <span>Error in adding movie!</span>
                <button className="btn btn-ghost" onClick={handleAddClose}><IoMdClose /></button>
                </div>
            </div>}
            {updateSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Movie updated successfully!</span>
                <button className="btn btn-ghost" onClick={handleUpdateClose}><IoMdClose /></button>
                </div>
            </div>}
            {updateFail && <div className="toast">
                <div className="alert alert-error">
                <span>Error in updating movie!</span>
                <button className="btn btn-ghost" onClick={handleUpdateClose}><IoMdClose /></button>
                </div>
            </div>}
            {deleteSuccess && <div className="toast">
                <div className="alert alert-success">
                <span>Movie deleted successfully!</span>
                <button onClick={handleDeleteClose} className="btn btn-ghost"><IoMdClose /></button>
                </div>
            </div>}
            {deleteFail && <div className="toast">
                <div className="alert alert-error">
                <span>Error in deleting movie!</span>
                <button className="btn btn-ghost" onClick={handleDeleteClose}><IoMdClose /></button>
                </div>
            </div>}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-fit gap-x-5 m-auto mb-2.5 mt-2.5'>
                <div id={`addMovie`} onClick={handleClickAdd} className="grid grid-cols-1 btn btn-ghost h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-45">
                    <img src='https://api-tikera.codence.hu/public/storage/movies/default.jpg' className="rounded-xl h-50 m-auto mt-2.5 mb-2.5"/>
                    <button className='btn btn-ghost rounded-xl m-auto mt-1.5 mb-1.5'>
                        <IoMdAdd /> Add movie
                    </button>
                </div>
                {
                    movies.map(movie => 
                        <div key={movie.id - 1} id={`movie${movie.id}`} className="grid grid-cols-1 btn btn-ghost h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-45">
                            <img src={movie.image_path} className="rounded-xl h-50 m-auto mt-2.5 mb-2.5"/>
                            <div className="grid grid-cols-1">
                                <p>{movie.title}</p>
                                <div className="grid grid-cols-2">
                                    <aside>{movie.genre}</aside>
                                    <aside>{`${movie.duration} mins`}</aside>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={() => handleClickEdit(movie)}><FaEdit /> Edit</button>
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={() => handleClickDelete(movie.id)}><MdDelete /> Delete</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <dialog id="movieModal" className='modal fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50'>
                <MovieForm edit={edit} handleClickClose={handleClickClose} handleSubmit={handleSubmit} />
            </dialog>
        </>
    )
}