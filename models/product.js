'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static Product

    static associate(models) {
      Product.Product = Product.belongsTo(models.User, {
        foreignKey: 'user_no',
        // as: "users"
      })
    }
  };
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "product_no"
    },
    product_name: DataTypes.STRING,
    product_desc: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    product_image: DataTypes.STRING,
    user_no: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};