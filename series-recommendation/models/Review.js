import { Model, DataTypes } from 'sequelize';
export default class Review extends Model {
  static init(sequelize) {
    return super.init({
      seriesId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Serie',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.TEXT,
      },
    }, {
      sequelize,
      modelName: 'Review',
    });
  }

  static associate(models) {
    this.belongsTo(models.Serie, {
      foreignKey: 'serieId',
      as: 'serie',
    });
  }
}