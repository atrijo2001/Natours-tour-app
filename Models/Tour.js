const mongoose = require('mongoose');
const slugify = require('slugify');

const toursSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name for the tour'],
        unique: [true, 'Name should be unique'],
        trim: true
    },
    slug: String,
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
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
    
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

toursSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
});

//Document middleware that runs before save and create command
toursSchema.pre('save', function(next){
   this.slug = slugify(this.name, {lower: true});
   next();
})

//Query Middleware
toursSchema.pre('find', function(next){

    next();
})

module.exports = mongoose.model('Tour', toursSchema)