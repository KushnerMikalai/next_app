import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this Category.'],
        maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)
