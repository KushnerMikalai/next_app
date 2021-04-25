import Form from '../components/Form'

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

    return <Form formId="add-pet-form" taskForm={taskForm} forNewPet={true} />
}

export default NewPet
