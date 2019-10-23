const mongoose = require('mongoose'); 

const blogsSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
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


module.exports = mongoose.model('blogs', blogsSchema);