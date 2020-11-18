'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static tableName = 'users';

    static associate(models) {

    }
  };
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "user_no"
    },
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_fname: DataTypes.STRING,
    user_lname: DataTypes.STRING,
    user_tel: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    // tableName: User.tableName,
    timestamps: false
  });
  return User;
};