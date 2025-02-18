const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, category_id, price, stock } = req.body;

    // Ensure the category exists before creating the product
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const product = await Product.create({ name, category_id, price, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all products with category details
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a product by ID (with category)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category' }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, category_id, price, stock } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure the category exists if updating it
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }

    await product.update({ name, category_id, price, stock });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;