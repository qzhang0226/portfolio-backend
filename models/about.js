const mongoose = require('mongoose'); 

const aboutSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    header: {
        type: String,
    },
    content: {
        type: String,
    },
    postImage: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('Images', aboutSchema);