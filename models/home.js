const mongoose = require('mongoose'); 

const homeSchema = mongoose.Schema({
    about: {
        type: Object,
        required: true,
    },
    profile: {
        type: Object,
        require: true,
    },
    project: {
        type: Object,
        require: true,
    },
    quotation: {
        type: Object,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('Home', homeSchema);