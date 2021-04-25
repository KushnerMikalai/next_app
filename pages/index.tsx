import Link from 'next/link'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dbConnect from '../utils/dbConnect'
import Task from '../models/Task'

const Index = ({ tasks }) => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      {tasks.map((task) => (
          <div key={task._id}>
            <div className="card">
              <img alt={task.name} src={task.image_url} />
              <h5 className="pet-name">{task.name}</h5>
              <div className="main-content">
                <p className="pet-name">{task.name}</p>
                <p className="owner">Owner: {task.owner_name}</p>

                {/* Extra Pet Info: Likes and Dislikes */}
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
                  <Link href="/[id]" as={`/${task._id}`}>
                    <button className="btn view">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      ))}
    </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </a>
    </footer>
  </div>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Task.find({})
  const tasks = result.map((doc) => {
    const task = doc.toObject()
    task._id = task._id.toString()
    return task
  })

  return { props: { tasks } }
}

export default Index
