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
    const {data, isLoading, isError} = useGetAllMoviesQuery()
    const movieModal = document.getElementById('movieModal')

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

    useEffect(() => {
        if (isEditing) {
            movieModal.showModal()
        }
    }, [isEditing, movieModal])

    const handleClick = (movie) => {
        dispatch(setMovie(movie))
        setIsEditing(false)
    }

    const handleClickAdd = () => {
        dispatch(setMovie(null))
        setEdit(null)
        setIsEditing(true)
        movieModal.showModal()
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
        movieModal.showModal()
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
            dispatch(setMovie(movies.find(movie => movie.id == id)))
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
            <div className='grid grid-cols-2'>
            <div className='h-fit'>
                <div className='grid grid-cols-3'>
                    <div id={`addMovie`} onClick={handleClickAdd} className="grid grid-cols-1 btn btn-ghost h-fit m-auto mt-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-700 w-45">
                        <img src='https://api-tikera.codence.hu/public/storage/movies/default.jpg' className="rounded-xl h-50 m-auto mt-2.5 mb-2.5"/>
                        <button className='btn btn-ghost rounded-xl m-auto mt-1.5 mb-1.5'>
                            <IoMdAdd /> Add movie
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
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={handleClickEdit}><FaEdit /> Edit</button>
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={handleClickDelete}><MdDelete /> Delete</button>
                            </div>
                        </div>
                    </div>
                }
                <MovieForm id={"movieModal"} edit={edit} setIsEditing={setIsEditing} handleSubmit={handleSubmit} />
            </div>
        </div>
        </>
    )
}