const mongoose = require('mongoose'); 

const experienceSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    duration: {
        type: String,
        require: true,
    },
    description: {
        type: Object,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Experience', experienceSchema);