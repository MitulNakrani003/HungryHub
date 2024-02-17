import asyncHandler from "express-async-handler";
import Fooditem from "../models/fooditemModel.js";

// @desc    Fetch all fooditems
// @route   GET /api/fooditem
// @access  Public
const getFooditems = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Fooditem.countDocuments({ ...keyword });
  const fooditems = await Fooditem.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ fooditems, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single fooditem
// @route   GET /api/fooditems/:id
// @access  Public
const getFooditemById = asyncHandler(async (req, res) => {
  const fooditem = await Fooditem.findById(req.params.id);

  if (fooditem) {
    res.json(fooditem);
  } else {
    res.status(404);
    throw new Error("Fooditem not found");
  }
});

// @desc    Delete a fooditem
// @route   DELETE /api/fooditems/:id
// @access  Private/Admin
const deleteFooditem = asyncHandler(async (req, res) => {
  const fooditem = await Fooditem.findById(req.params.id);

  if (fooditem) {
    await fooditem.remove();
    res.json({ message: "Fooditem removed" });
  } else {
    res.status(404);
    throw new Error("Fooditem not found");
  }
});

// @desc    Create a fooditem
// @route   POST /api/fooditems
// @access  Private/Admin
const createFooditem = asyncHandler(async (req, res) => {
  const fooditem = new Fooditem({
    name: "Spaghetti",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    calories: "Spaghetti",
    category: "Food",
    countInStock: 0,
    numReviews: 0,
    description: "Spaghetti is a long, thin, solid, cylindrical pasta. It is a staple food of traditional Italian cuisine.",
  });

  const createdFooditem = await fooditem.save();
  res.status(201).json(createdFooditem);
});

// @desc    Update a fooditem
// @route   PUT /api/fooditems/:id
// @access  Private/Admin
const updateFooditem = asyncHandler(async (req, res) => {
  const { name, price, description, image, calories, category, countInStock } =
    req.body;

  const fooditem = await Fooditem.findById(req.params.id);

  if (fooditem) {
    fooditem.name = name;
    fooditem.price = price;
    fooditem.description = description;
    fooditem.image = image;
    fooditem.calories = calories;
    fooditem.category = category;
    fooditem.countInStock = countInStock;

    const updatedFooditem = await fooditem.save();
    res.json(updatedFooditem);
  } else {
    res.status(404);
    throw new Error("Fooditem not found");
  }
});

// @desc    Create new review
// @route   POST /api/fooditems/:id/reviews
// @access  Private
const createFooditemReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const fooditem = await Fooditem.findById(req.params.id);

  if (fooditem) {
    const alreadyReviewed = fooditem.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Fooditem already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    fooditem.reviews.push(review);

    fooditem.numReviews = fooditem.reviews.length;

    fooditem.rating =
      fooditem.reviews.reduce((acc, item) => item.rating + acc, 0) /
      fooditem.reviews.length;

    await fooditem.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Fooditem not found");
  }
});

// @desc    Get top rated fooditems
// @route   GET /api/fooditems/top
// @access  Public
const getTopFooditems = asyncHandler(async (req, res) => {
  const fooditems = await Fooditem.find({}).sort({ rating: -1 }).limit(3);

  res.json(fooditems);
});

export {
  getFooditems,
  getFooditemById,
  deleteFooditem,
  createFooditem,
  updateFooditem,
  createFooditemReview,
  getTopFooditems,
};
