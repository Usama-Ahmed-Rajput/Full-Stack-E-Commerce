const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Search keyword filter
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { brand: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } }
        ]
      }
    : {};

  // Category filter
  const categoryFilter = req.query.category && req.query.category !== 'All'
    ? { category: req.query.category }
    : {};

  // Price range filter
  const priceFilter = {};
  if (req.query.minPrice) priceFilter.$gte = Number(req.query.minPrice);
  if (req.query.maxPrice) priceFilter.$lte = Number(req.query.maxPrice);
  const priceQuery = Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {};

  // Featured filter
  const featuredQuery = req.query.featured === 'true' ? { isFeatured: true } : {};

  const query = {
    ...keyword,
    ...categoryFilter,
    ...priceQuery,
    ...featuredQuery
  };

  // Sorting
  let sort = {};
  switch (req.query.sort) {
    case 'price_asc':
      sort = { price: 1 };
      break;
    case 'price_desc':
      sort = { price: -1 };
      break;
    case 'rating':
      sort = { rating: -1 };
      break;
    case 'newest':
    default:
      sort = { createdAt: -1 };
      break;
  }

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sort)
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    success: true,
    data: products,
    page,
    pages: Math.ceil(count / limit),
    total: count
  });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json({
      success: true,
      data: product
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, price, oldPrice, category, image, stock, rating, isFeatured } = req.body;

  if (!name || !brand || !description || price === undefined || !category || !image || stock === undefined) {
    res.status(400);
    throw new Error('Please fill in all required fields (name, brand, description, price, category, image, stock)');
  }

  const product = new Product({
    name,
    brand,
    description,
    price: Number(price),
    oldPrice: oldPrice ? Number(oldPrice) : 0,
    category,
    image,
    stock: Number(stock),
    rating: rating ? Number(rating) : 4.5,
    isFeatured: Boolean(isFeatured)
  });

  const createdProduct = await product.save();
  res.status(201).json({
    success: true,
    data: createdProduct,
    message: 'Product created successfully'
  });
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, description, price, oldPrice, category, image, stock, rating, isFeatured } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.oldPrice = oldPrice !== undefined ? Number(oldPrice) : product.oldPrice;
    product.category = category || product.category;
    product.image = image || product.image;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    product.rating = rating !== undefined ? Number(rating) : product.rating;
    product.isFeatured = isFeatured !== undefined ? Boolean(isFeatured) : product.isFeatured;

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Product removed successfully'
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
