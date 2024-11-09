const mongoose = require('mongoose');
const Product = require('./Product');
const Activity = require('./Activity');
const Itinerary = require('./Itinerary');
const TourGuide = require('./User');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
        activity: {
            type: mongoose.Schema.ObjectId,
            ref: 'Activity',
        },
        itinerary: {
            type: mongoose.Schema.ObjectId,
            ref: 'Itinerary',
        },
        tourGuide: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a User.'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Populate user field when retrieving reviews
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'username',
    });
    next();
});


async function calcAverageRatings(model, refField, refId) {
    // Ensure refId is properly converted to string for comparison
    const id = refId.toString();

    const stats = await Review.aggregate([
        { $match: { [refField]: mongoose.Types.ObjectId(id) } },  // Dynamic field reference
        {
            $group: {
                _id: `$${refField}`,
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' },
            },
        },
    ]);

    if (stats.length > 0) {
        await model.findByIdAndUpdate(id, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating,
        });
    } else {
        await model.findByIdAndUpdate(id, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5,
        });
    }

    // const thing = await model.findById(refId);
    // thing.save({ validateBeforeSave: false });

    // console.log(await model.findbyId(refId).ratingsQuantity);
}

// Middleware to update average ratings after saving a review
reviewSchema.post('save', function () {
    if (this.product) calcAverageRatings(Product, 'product', this.product);
    if (this.activity) calcAverageRatings(Activity, 'activity', this.activity);
    if (this.itinerary) calcAverageRatings(Itinerary, 'itinerary', this.itinerary);
    if (this.tourGuide) calcAverageRatings(TourGuide, 'tourGuide', this.tourGuide);
    console.log(this.product);
});

// Middleware to update average ratings after updating or deleting a review
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.model.findOne(this.getQuery());
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    if (this.r) {
        if (this.r.product) await calcAverageRatings(Product, 'product', this.r.product);
        if (this.r.activity) await calcAverageRatings(Activity, 'activity', this.r.activity);
        if (this.r.itinerary) await calcAverageRatings(Itinerary, 'itinerary', this.r.itinerary);
        if (this.r.tourGuide) await calcAverageRatings(TourGuide, 'tourGuide', this.r.tourGuide);
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
