const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String, 
        required: true 
    },
    tags:[{
        type: String, 
        required: true
    }],
    
}, {timestamps:true})

const NewCars = mongoose.model('NewCars', carSchema)

module.exports = NewCars