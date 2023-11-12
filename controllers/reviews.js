const Restaurant = require("../models/restaurant");
const Review = require("../models/review");

module.exports.newReview = async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  restaurant.reviews.push(review);
  await review.save();
  await restaurant.save();
  req.flash("success", "Created new review!");
  res.redirect(`/restaurants/${restaurant._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Restaurant.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Deleted Review");
  res.redirect(`/restaurants/${id}`);
};
