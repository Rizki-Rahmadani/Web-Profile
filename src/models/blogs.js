'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blogs.init({
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    content: DataTypes.STRING,
    technologies: DataTypes.STRING,
    imgae: DataTypes.STRING,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blogs',
  });
  return blogs;
};