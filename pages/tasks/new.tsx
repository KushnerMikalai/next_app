import Form from '../../components/Form'
import Layout from '../../components/layouts'

const NewPet = () => {
    const taskForm = {
        name: '',
        owner_name: '',
        species: '',
        age: 0,
        poddy_trained: false,
        diet: [],
        image_url: '',
        likes: [],
        dislikes: [],
    }

    return <Layout>
        <Form formId="add-pet-form" taskForm={taskForm} forNewTask={true}/>
    </Layout>
}

export default NewPet
