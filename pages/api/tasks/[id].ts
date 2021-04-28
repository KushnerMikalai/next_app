import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/dbConnect'
import Task from '../../../models/Task'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const {
        query: {id},
        method,
    } = _req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const pet = await Task.findById(id)
                if (!pet) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: pet})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        case 'PUT':
            try {
                const pet = await Task.findByIdAndUpdate(id, _req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!pet) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: pet})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        case 'DELETE':
            try {
                const deletedPet = await Task.deleteOne({_id: id})
                if (!deletedPet) {
                    return res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: {}})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break

        default:
            res.status(400).json({success: false})
            break
    }
}
