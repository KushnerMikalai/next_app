import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useAppDispatch } from '../../store/hooks'
import { showPageLoader, hidePageLoader } from '../../store/slices/rootSlice'

import { TaskType } from '../../interfaces'

interface Props {
    tasks: TaskType[]
}

const TasksPage: NextPage<Props> = ({tasks}) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(hidePageLoader())
    }, [dispatch])

    return (
        <div>
            <Head>
                <title>Tasks</title>
            </Head>
            <main className="task-list">
                {tasks.map((task) => (
                    <div key={task._id} className="card">
                        <div className="card__name">
                            <img alt={task.name} src={task.image_url}/>
                            <h5 className="pet-name">{task.name}</h5>
                        </div>
                        <div className="main-content">
                            <p className="pet-name">{task.name}</p>
                            <p className="owner">Owner: {task.owner_name}</p>
                            <div className="likes info">
                                <p className="label">Likes</p>
                                <ul>
                                    {task.likes.map((data: string, index: number) => (
                                        <li key={index}>{data} </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="dislikes info">
                                <p className="label">Dislikes</p>
                                <ul>
                                    {task.dislikes.map((data: string, index: number) => (
                                        <li key={index}>{data}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="btn-container">
                                <Link href="/tasks/[id]/edit" as={`/tasks/${task._id}/edit`}>
                                    <button className="btn edit">Edit</button>
                                </Link>
                                <Link href="/tasks/[id]" as={`/tasks/${task._id}`}>
                                    <button className="btn view">View</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
            <style jsx>{`
            .task-list {
                margin: 0 auto;
                max-width: 50rem;
            }

            .card {
                border: 1px solid #0070f3;
                margin-bottom: 1rem;
                padding: 1rem;
            }

            .card__name {
                display: flex;
            }
            `}</style>
        </div>
    )
}

TasksPage.getInitialProps = async (ctx) => {
    const { dispatch } = ctx.store
    await dispatch(showPageLoader())

    // TODO: move to store dispatch
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks`)
    const json = await res.json()
    return {
        tasks: json.data,
    }
}

// export async function getServerSideProps() {
//     return {props: {}}
// }

export default TasksPage
