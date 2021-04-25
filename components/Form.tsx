import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

type TaskForm = {
    name: string,
    owner_name: string,
    species: string,
    age: number,
    poddy_trained: boolean,
    diet: [],
    image_url: string,
    likes: [],
    dislikes: [],
}

type Error = {
    name: string,
    owner_name: string,
    species: string,
    image_url: string
}

type Form = {
    forNewPet: boolean,
    formId: string,
    taskForm: any
}

const Form = ({formId, taskForm, forNewPet = true}: Form) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        name: taskForm.name,
        owner_name: taskForm.owner_name,
        species: taskForm.species,
        age: taskForm.age,
        poddy_trained: taskForm.poddy_trained,
        diet: taskForm.diet,
        image_url: taskForm.image_url,
        likes: taskForm.likes,
        dislikes: taskForm.dislikes,
    })

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form: TaskForm) => {
        const {id} = router.query

        try {
            const res: any = await fetch(`/api/pets/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            const {data} = await res.json()
            mutate(`/api/pets/${id}`, data, false) // Update the local data without a revalidation
            router.push('/')
        } catch (error) {
            setMessage('Failed to update pet')
        }
    }

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form: TaskForm) => {
        try {
            const res: any = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
        } catch (error) {
            setMessage('Failed to add pet')
        }
    }

    const handleChange = (e: ChangeEvent): void => {
        const target = e.target as HTMLInputElement;
        const value =
            target.name === 'poddy_trained' ? target.checked : target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            forNewPet ? await postData(form) : putData(form)
        } else {
            setErrors({errs})
        }
    }

    /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
    const formValidate = () => {
        const err: Error = {
            name: '',
            owner_name: '',
            species: '',
            image_url: ''
        }
        if (!form.name) err.name = 'Name is required'
        if (!form.owner_name) err.owner_name = 'Owner is required'
        if (!form.species) err.species = 'Species is required'
        if (!form.image_url) err.image_url = 'Image URL is required'
        return err
    }

    return (
        <>
            <form
                className={'form'}
                id={formId}
                onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    maxLength={20}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="owner_name">Owner</label>
                <input
                    type="text"
                    maxLength={20}
                    name="owner_name"
                    value={form.owner_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="species">Species</label>
                <input
                    type="text"
                    maxLength={30}
                    name="species"
                    value={form.species}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                />

                <label htmlFor="poddy_trained">Potty Trained</label>
                <input
                    type="checkbox"
                    name="poddy_trained"
                    checked={form.poddy_trained}
                    onChange={handleChange}
                />

                <label htmlFor="diet">Diet</label>
                <textarea
                    name="diet"
                    maxLength={60}
                    value={form.diet}
                    onChange={handleChange}
                />

                <label htmlFor="image_url">Image URL</label>
                <input
                    type="url"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="likes">Likes</label>
                <textarea
                    name="likes"
                    maxLength={60}
                    value={form.likes}
                    onChange={handleChange}
                />

                <label htmlFor="dislikes">Dislikes</label>
                <textarea
                    name="dislikes"
                    maxLength={60}
                    value={form.dislikes}
                    onChange={handleChange}
                />

                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>

            <style jsx>{`
              .form {
                padding: 1rem;
                display: block;
                max-width: 40rem;
                margin: 0 auto;
              }

              label {
                display: ${forNewPet ? 'inline-block' : 'block'};
                width: 100%;
                margin-bottom: .2rem;
              }

              textarea,
              input {
                margin-bottom: 1rem;
                min-width: 20rem;
              }

              input[type=checkbox] {
                min-width: initial;
              }

              button {
                display: block;
              }
            `}</style>
        </>
    )
}

export default Form
