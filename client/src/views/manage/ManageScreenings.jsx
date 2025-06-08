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
    const {data: movieData, isSuccess: isMoviesSuccess, isLoading: isMoviesLoading, isError: isMoviesError} = useGetAllMoviesQuery()
    const {data: screeningData, isSuccess: isScreeningsSuccess, isLoading: isScreeningsLoading, isError: isScreeningsError} = useGetAllScreeningsQuery()
    const [screeningModal, setScreeningModal] = useState(null)

    useEffect(() => {
        if(isMoviesSuccess && isScreeningsSuccess)
            setScreeningModal(document.getElementById("screeningModal"))
    }, [isMoviesSuccess, isScreeningsSuccess])

    useEffect(() => {
        if (isAddSuccess) {
            console.log("Screening added successfully: ", dataAdd)
            setIsEditing(false)
            setAddSuccess(true)
            screeningModal.close()
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
            screeningModal.close()
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

    useEffect(() => {
        if(screeningModal)
        {
            if (isEditing)
                screeningModal.showModal()
            else
                screeningModal.close()
        }
    }, [isEditing, screeningModal])

    useEffect(() => {
        if (selectedScreening) {
            setEdit({
                movie_id: selectedScreening.movie.id,
                room_id: selectedScreening.room.rows == 10 ? 1 : 2,
                date: selectedScreening.date,
                start_time: selectedScreening.start_time
            })
            setIsEditing(true)
        } else {
            setEdit(null)
            setIsEditing(false)
        }
    }, [selectedScreening, setEdit, setIsEditing])
    
    if (isScreeningsLoading || isMoviesLoading) return <span className="loading loading-spinner loading-md"></span>
    if (isScreeningsError || isMoviesError) return <span>Error</span>
    
    const movies = movieData?.data.filter(
        movie => movie.screenings.some(screening => screening.week_number == weekNumber && screening.week_day == weekDay)
    )
    const screenings = screeningData?.data.filter(screening => 
        movies.some(movie => movie.screenings.some(screen => screen.id == screening.id && screen.week_number == weekNumber && screen.week_day == weekDay))
    )

    const getMovieToScreening = (id) => {
        return movies.find(movie => movie.screenings.find(screening => screening.id == id))
    }

    const getDateToScreening = (id) => {
        return movies.find(movie => movie.screenings.find(screening => screening.id == id)).screenings.find(screening => screening.id == id).date
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

    const handleClickAdd = () => {
        dispatch(setScreening(null))
        setEdit(null)
        setIsEditing(true)
        screeningModal.showModal()
    }

    const handleClickEdit = (screening) => {
        dispatch(setScreening(screening))
        setEdit({
            movie_id: screening.movie.id,
            room_id: screening.room.rows == 10 ? 1 : 2,
            date: screening.date,
            start_time: screening.start_time
        })
        setIsEditing(true)
        screeningModal.showModal()
    }

    const handleSubmit = (e, formData, edit) => {
        e.preventDefault()
        if (edit == null)
        {
            createScreening(formData)
        }
        else
        {
            const id = selectedScreening.id
            const screening = formData
            updateScreening({ id, screening })
            dispatch(setScreening(null))
        }
        screeningModal.close()
    }

    const handleClickDelete = (id) => {
        deleteScreening(id)
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
        dispatch(setScreening(null))
        setIsEditing(false)
        screeningModal.close()
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
            <div className='h-fit w-fit m-auto'>
                <Days />
                <table className='table table-zebra bg-slate-700 rounded-xl overflow-x-auto'>
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Room</th>
                            <th>Total seats</th>
                            <th>Available seats</th>
                            <th>Edit</th>
                            <th>Delete</th>
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
                            <tr key={screening.id}>
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
                                <td>
                                    <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5" onClick={() => handleClickEdit(screening)}>
                                        <FaEdit />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-ghost rounded-xl p-2.5 m-auto mt-1.5 mb-1.5" onClick={() => handleClickDelete(screening.id)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <dialog id="screeningModal" className='modal fixed inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center z-50'>
                <ScreeningForm edit={edit} handleClickClose={handleClickClose} handleSubmit={handleSubmit} />
            </dialog>
        </>
    )
}