const mongoose = require('mongoose');
const Product = require('./Product');
const Activity = require('./Activity');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review can not be empty!']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
        activity: {
            type: mongoose.Schema.ObjectId,
            ref: 'Activity',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a User.']
        }
    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });


////////////////// MiddleWare //////////////////

reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ activity: 1, user: 1 }, { unique: true });


reviewSchema.pre(/^find/, function(next){

    this.populate({
        path: 'user',
        select: 'username'
    })
    next()
});

reviewSchema.statics.calcAverageProductRatings = async function(productId) {
    const stats = await this.aggregate([
      {
        $match: { product: productId }
      },
      {
        $group: {
          _id: '$product',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);
  
    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
      });
    } else {
      await Product.findByIdAndUpdate(productId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
      });
    }
  };
  

  
  reviewSchema.statics.calcAverageActivityRatings = async function(activityId) {
    const stats = await this.aggregate([
      {
        $match: { activity: activityId }
      },
      {
        $group: {
          _id: '$activity',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);
  
    if (stats.length > 0) {
      await Activity.findByIdAndUpdate(activityId, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
      });
    } else {
      await Activity.findByIdAndUpdate(activityId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5
      });
    }
  };
  
  reviewSchema.post('save', function() {
    this.constructor.calcAverageProductRatings(this.product);
    this.constructor.calcAverageActivityRatings(this.activity);

  });

  // findByIdAndUpdate
  // findByIdAndDelete
  reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.model.findOne(this.getQuery());
    // console.log(this.r);
    next();
  });
  
  reviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calcAverageProductRatings(this.r.product);
    await this.r.constructor.calcAverageActivityRatings(this.r.activity);

  });
  
  const Review = mongoose.model('Review', reviewSchema);
  
  module.exports = Review;
  