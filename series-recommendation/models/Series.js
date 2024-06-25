// models/series.js

import { Model, DataTypes } from 'sequelize';

export default class Series extends Model {
  static init(sequelize) {
    return super.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      temporadas: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Cambia a ARRAY de STRING o al tipo que necesites
        allowNull: false,
      },
      servicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estrellas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      calificaciones: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Series',
    });
  }

  static associate(models) {
    this.hasMany(models.Review, {
      foreignKey: 'seriesId',
      as: 'reviews',
    });
  }
}
