const mongoose = require('mongoose'); 

const profileSchema = mongoose.Schema({
    postImage: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        require: true,
    },
    subTitle: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('Profile', profileSchema);