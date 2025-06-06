import React from 'react'
import { useGetAllMoviesQuery, useGetAllScreeningsQuery, useCreateScreeningMutation, useUpdateScreeningMutation, useDeleteScreeningMutation } from '../../store/moviesApi'
import { IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Days } from '../movies/Days'
import { useState, useEffect } from 'react'
import { setScreening } from '../../store/movieSlice'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { ScreeningForm } from './ScreeningForm'
import { IoMdClose } from 'react-icons/io'

export const ManageScreenings = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [edit, setEdit] = useState(null)
    const [addSuccess, setAddSuccess] = useState(false)
    const [addFail, setAddFail] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [updateFail, setUpdateFail] = useState(false)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteFail, setDeleteFail] = useState(false)
    const weekNumber = useSelector(state => state.movie.selectedWeek)
    const weekDay = useSelector(state => state.movie.selectedDay)
    const selectedScreening = useSelector(state => state.movie.selectedScreening)
    const dispatch = useDispatch()
    const [createScreening, {isSuccess: isAddSuccess, isLoading: isAddLoading, isError: isAddError, error: errorAdd, data: dataAdd}] = useCreateScreeningMutation()
    const [updateScreening, {isSuccess: isUpdateSuccess, isLoading: isUpdateLoading, isError: isUpdateError, error: errorUpdate, data: dataUpdate}] = useUpdateScreeningMutation()
    const [deleteScreening, {isSuccess: isDeleteSuccess, isLoading: isDeleteLoading, isError: isDeleteError, error: errorDelete, data: dataDelete}] = useDeleteScreeningMutation()
    
    useEffect(() => {
        if (isAddSuccess) {
            console.log("Screening added successfully: ", dataAdd)
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
            console.log("Screening updated successfully: ", dataUpdate)
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
            console.log("Screening deleted successfully: ", dataDelete)
            setIsEditing(false)
            dispatch(setScreening(null))
            setDeleteSuccess(true)
        }
    }, [isDeleteSuccess, dataDelete, setIsEditing])

    useEffect(() => {
        if (isDeleteError) {
            setDeleteFail(true)
        }
    }, [isDeleteError])
    
    const {data: movieData, isLoading: isMoviesLoading, isError: isMoviesError} = useGetAllMoviesQuery()
    const {data: screeningData, isLoading: isScreeningsLoading, isError: isScreeningsError} = useGetAllScreeningsQuery()
    if (isScreeningsLoading || isMoviesLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isScreeningsError || isMoviesError) return <span>Error</span>
    
    const movies = movieData?.data.filter(
        movie => movie.screenings.some(screening => screening.week_number == weekNumber && screening.week_day == weekDay)
    )
    const screenings = screeningData?.data.filter(screening => 
        movies.some(movie => movie.screenings.some(screen => screen.id == screening.id && screen.week_number == weekNumber && screen.week_day == weekDay))
    )

    const getMovieToScreening = (id) => {
        return movies.filter(movie => movie.screenings.some(screening => screening.id == id))[0]
    }

    const getDateToScreening = (id) => {
        return movies.filter(movie => movie.screenings.some(screening => screening.id == id))[0].screenings.find(screening => screening.id == id).date
    }

    const screeningsData = screenings.map(screening => {
        return {
            ...screening,
            movie: getMovieToScreening(screening.id),
            date: getDateToScreening(screening.id),
            availableSeats: screening.room.rows * screening.room.seatsPerRow - screening.bookings.length
        }
    })

    const sortedScreeningsData = screeningsData.sort((a, b) => a.movie.title.localeCompare(b.movie.title))

    console.log(sortedScreeningsData)

    const handleClick = (screening) => {
        dispatch(setScreening(screening))
    }

    const handleClickAdd = () => {
        dispatch(setScreening(null))
        setEdit(null)
        setIsEditing(true)
    }

    const handleClickEdit = () => {
        setEdit({
            movie_id: selectedScreening.movie.id,
            room_id: selectedScreening.room.rows == 10 ? 1 : 2,
            date: selectedScreening.date,
            start_time: selectedScreening.start_time
        })
        setIsEditing(true)
    }

    const handleSubmit = (e, formData, edit) => {
        e.preventDefault()
        console.log(formData)
        if (edit == null)
        {
            createScreening(formData)
        }
        else
        {
            const id = selectedScreening.id
            const screening = formData
            updateScreening({ id, screening })
        }
            
    }

    const handleClickDelete = () => {
        deleteScreening(selectedScreening.id)
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
            <span>Screening added successfully!</span>
            <button className="btn btn-ghost" onClick={handleAddClose}><IoMdClose /></button>
            </div>
        </div>}
        {addFail && <div className="toast">
            <div className="alert alert-error">
            <span>Error in adding screening!</span>
            <button className="btn btn-ghost" onClick={handleAddClose}><IoMdClose /></button>
            </div>
        </div>}
        {updateSuccess && <div className="toast">
            <div className="alert alert-success">
            <span>Screening updated successfully!</span>
            <button className="btn btn-ghost" onClick={handleUpdateClose}><IoMdClose /></button>
            </div>
        </div>}
        {updateFail && <div className="toast">
            <div className="alert alert-error">
            <span>Error in updating screening!</span>
            <button className="btn btn-ghost" onClick={handleUpdateClose}><IoMdClose /></button>
            </div>
        </div>}
        {deleteSuccess && <div className="toast">
            <div className="alert alert-success">
            <span>Screening deleted successfully!</span>
            <button onClick={handleDeleteClose} className="btn btn-ghost"><IoMdClose /></button>
            </div>
        </div>}
        {deleteFail && <div className="toast">
            <div className="alert alert-error">
            <span>Error in deleting screening!</span>
            <button className="btn btn-ghost" onClick={handleDeleteClose}><IoMdClose /></button>
            </div>
        </div>}
        <div className='grid grid-cols-2'>
            <div className='h-fit w-fit m-auto'>
                <Days />
                <table className='table table-zebra bg-slate-700 rounded-xl'>
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Room</th>
                            <th>Total seats</th>
                            <th>Available seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <button className='btn btn-ghost rounded-xl m-auto mt-0.5 mb-0.5 bg-slate-700' onClick={handleClickAdd}>
                                    <IoMdAdd /> Add screening
                                </button>
                            </td>
                        </tr>
                    {
                        sortedScreeningsData.map(screening => 
                            <tr key={screening.id} onClick={() => handleClick(screening)}>
                                <td>{screening.movie.title}</td>
                                <td>{new Date(Date.parse(screening.date)).toLocaleDateString('hu-HU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric'
                                })}</td>
                                <td>{screening.start_time}</td>
                                <td>{screening.room.rows == 10 ? 'Grand Hall' : 'Small Theater'}</td>
                                <td>{screening.room.rows * screening.room.seatsPerRow}</td>
                                <td>{screening.room.rows * screening.room.seatsPerRow - screening.bookings.length}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className='h-fit'>
                {
                    selectedScreening == null ? <></> : 
                    <div className="grid grid-cols-2 p-2.5 m-2.5 bg-slate-700 rounded-xl lg:flex-row">
                        <img src={selectedScreening.movie.image_path} className="rounded-xl h-100 m-auto mt-2.5 mb-2.5"/>
                        <div className="grid grid-cols-1 text-left h-fit p-2.5">
                            <h2 className="text-2xl">{selectedScreening.movie.title}</h2>
                            <aside>{selectedScreening.movie.release_year} | {selectedScreening.movie.genre} | {selectedScreening.movie.duration} minutes</aside>
                            <p className="pt-2.5 pb-2.5">
                                {selectedScreening.movie.description}
                            </p>
                            <p className="pt-2.5 pb-2.5">
                                {selectedScreening.date}, {selectedScreening.start_time}<br/>
                                {selectedScreening.room.rows == 10 ? 'Grand Hall' : 'Small Theater'}<br/>
                                Total seats: {selectedScreening.room.rows * selectedScreening.room.seatsPerRow}<br/>
                                Available seats: {selectedScreening.room.rows * selectedScreening.room.seatsPerRow - selectedScreening.bookings.length}
                            </p>
                            <div className="grid grid-cols-2">
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={handleClickEdit}><FaEdit /> Edit</button>
                                <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5 bg-slate-700" onClick={handleClickDelete}><MdDelete /> Delete</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    isEditing ? <ScreeningForm edit={edit} setIsEditing={setIsEditing} handleSubmit={handleSubmit} /> : <></>
                }
            </div>
        </div>
        </>
    )
}