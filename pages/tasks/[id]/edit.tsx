import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/Form'
import Layout from '../../../components/layouts'

const fetcher = (url: string) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

const EditTask = () => {
    const router = useRouter()
    const {id} = router.query
    const {data: task, error} = useSWR(id ? `/api/tasks/${id}` : null, fetcher)

    if (error) return <p>Failed to load</p>
    if (!task) return <p>Loading...</p>

    const tasksForm = {
        name: task.name,
        owner_name: task.owner_name,
        species: task.species,
        age: task.age,
        poddy_trained: task.poddy_trained,
        diet: task.diet,
        image_url: task.image_url,
        likes: task.likes,
        dislikes: task.dislikes,
    }

    return <Layout>
        <Form formId="edit-task-form" taskForm={tasksForm} forNewTask={false}/>
    </Layout>
}

export default EditTask
