'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Serie.init({
    name: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    temporadas: DataTypes.STRING,
    servicio: DataTypes.STRING,
    categoria: DataTypes.STRING,
    estrellas: DataTypes.INTEGER,
    calificaciones: DataTypes.INTEGER,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Serie',
  });
  return Serie;
};