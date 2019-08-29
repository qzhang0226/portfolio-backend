const mongoose = require('mongoose'); 

const quoteSchema = mongoose.Schema({
    bgColor:{
        type: String,
        require: true,
    },
    sentence: {
        type: String,
        require: true,
    },
    from: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Quotation', quoteSchema);