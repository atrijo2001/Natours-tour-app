const mongoose = require('mongoose')

const toursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for the tour'],
        unique: [true, 'Name should be unique'],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour requires a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'Must have difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price of the tour']
    },
    priceDiscount: {
        type: Number
    },
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have an image']
    },
    image: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
})

module.exports = mongoose.model('Tour', toursSchema)