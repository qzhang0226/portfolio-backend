const mongoose = require('mongoose'); 


const imageSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: false,
    }
});


module.exports = mongoose.model('Images', imageSchema);