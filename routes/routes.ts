import {Router} from "express";
import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    names: {
        type: [String],
        required: true,
    },
})

interface FrontendData {
    names: string[]
}

const model = mongoose.model('planets', dataSchema);

export const router = Router();

// GET METHOD
router.get('/names/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await model.findOne({_id: id});
        const response: FrontendData = {
            names: data?.names ?? []
        }
        res.json(response);

    } catch (error) {
        res.json({message: error})
    }
})