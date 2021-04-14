const mongoose = require('mongoose')

const toursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for the tour'],
        unique: [true, 'Name should be unique']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price of the tour']
    }
})

module.exports = mongoose.model('Tour', toursSchema)