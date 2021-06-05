export interface TaskType {
    _id: string,
    name: string,
    image_url: string,
    owner_name: string,
    likes: [],
    dislikes: [],

    species: string,
    age: number,
    poddy_trained: boolean,
}

export interface UserType {
    name: string
    email?: string
}

export interface Provider {
    name: string
    id: string
}
