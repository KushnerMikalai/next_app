import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../utils/dbConnect'
import Task from '../../../models/Task'
import { TaskType } from '../../../interfaces'

interface Props {
    task: TaskType;
}

const TaskPage: React.FC<Props> = ({task}) => {
    const router = useRouter()
    const [message, setMessage] = useState('')
    const handleDelete = async () => {
        const petID = router.query.id

        try {
            await fetch(`/api/tasks/${petID}`, {
                method: 'Delete',
            })
            router.push('/tasks')
        } catch (error) {
            setMessage('Failed to delete the pet.')
        }
    }

    return (
        <div key={task._id}>
            <div className="card">
                <img src={task.image_url}/>
                <h5 className="pet-name">{task.name}</h5>
                <div className="main-content">
                    <p className="pet-name">{task.name}</p>
                    <p className="owner">Owner: {task.owner_name}</p>

                    {/* Extra task Info: Likes and Dislikes */}
                    <div className="likes info">
                        <p className="label">Likes</p>
                        <ul>
                            {task.likes.map((data, index) => (
                                <li key={index}>{data} </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dislikes info">
                        <p className="label">Dislikes</p>
                        <ul>
                            {task.dislikes.map((data, index) => (
                                <li key={index}>{data} </li>
                            ))}
                        </ul>
                    </div>

                    <div className="btn-container">
                        <Link href="/[id]/edit" as={`/${task._id}/edit`}>
                            <button className="btn edit">Edit</button>
                        </Link>
                        <button className="btn delete" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    await dbConnect()

    // @ts-ignore
    const {id} = context.params;

    const task = await Task.findById(id).lean()
    task._id = task._id.toString()

    return {props: {task}}
}

export default TaskPage
