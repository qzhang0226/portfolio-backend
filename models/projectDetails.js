const mongoose = require('mongoose'); 

const projectDetailsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    postImage: {
        type: Array,
        required: false,
    },
    keywords:{
        type: String,
        require: true,
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

module.exports = mongoose.model('ProjectDetails', projectDetailsSchema);