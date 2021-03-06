const mongoose = require('mongoose'); 

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    postImage: {
        type: String,
        required: false,
    },
    name:{
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Project', projectSchema);