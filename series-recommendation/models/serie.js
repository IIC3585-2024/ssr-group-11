import { Model, DataTypes } from 'sequelize';

export default class Serie extends Model {
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
        type: DataTypes.STRING,
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
      modelName: 'Serie',
    });
  }

  static associate(models) {
    this.hasMany(models.Review, {
      foreignKey: 'serieId',
      as: 'reviews',
    });
  }
}