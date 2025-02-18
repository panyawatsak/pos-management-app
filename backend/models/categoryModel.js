'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // If a Category has many Products (1:M relationship)
      Category.hasMany(models.Product, {
        foreignKey: 'category_id',
        as: 'products'
      });
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories',
      timestamps: true
    }
  );

  return Category;
};