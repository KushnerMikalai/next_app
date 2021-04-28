import React from 'react'
import dbConnect from '../../utils/dbConnect'
import Task from '../../models/Task'
import { TaskType } from '../../interfaces'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layouts'

interface Props {
    tasks: TaskType[];
}

const TasksPage: React.FC<Props> = ({tasks}) => (
    <Layout>
        <div>
            <Head>
                <title>tasks</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="task-list">
                {/*<h1 className={styles.title}>Welcome to <a href="https://nextjs.org">Next.js!</a></h1>*/}

                {tasks.map((task) => (
                    <div key={task._id} className="card">
                        <div className="card__name">
                            <img alt={task.name} src={task.image_url}/>
                            <h5 className="pet-name">{task.name}</h5>
                        </div>
                        <div className="main-content">
                            <p className="pet-name">{task.name}</p>
                            <p className="owner">Owner: {task.owner_name}</p>

                            {/* Extra Pet Info: Likes and Dislikes */}
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
        </div>

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
    </Layout>
)

export async function getServerSideProps() {
    await dbConnect()

    /* find all the data in our database */
    const result = await Task.find({})
    const tasks = result.map((doc) => {
        const task = doc.toObject()
        task._id = task._id.toString()
        return task
    })

    return {props: {tasks}}
}

export default TasksPage
