const mongoose = require('mongoose');

//Schemas still to be defined, just to know that everything works 

const PokemonSchema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true, 
        unique: true
    }
})