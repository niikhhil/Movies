import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/genre.js"

const createGenre = asyncHandler(async (req, res) => {

    try {
        const { name } = req.body;
        
        if(!name) {
            return res.json({error: "Name is required"})
        }

        const existingGenre = await Genre.findOne({ name });

        if(existingGenre) {
            return res.json({error: "Genre already exist."})
        }

        const genre = await new Genre({name}).save();
        res.json(genre);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateGenre = asyncHandler(async (req, res) => {
    
    try {
        
        const { name } = req.body
        const { id } = req.params

        const genre = await findOne({_id: id});

        if(!genre) {
            return res.status(404).json({error: "Genre not found."})
        }

        genre.name = name;
        const updatedGenre = await genre.save();
        res.json(updatedGenre)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error."})        
    }
});

export { createGenre, updateGenre };