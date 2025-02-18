const express = require('express');
const router = express.Router();
const { Category, Product } = require('../models');

// Create a new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update({ name });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a category and associated products
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Delete associated products
    await Product.destroy({ where: { category_id: category.id } });

    // Delete the category
    await category.destroy();

    res.status(200).json({ message: 'Category and associated products deleted successfully' });
  } catch (error) {
    console.error('Error deleting category and products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;