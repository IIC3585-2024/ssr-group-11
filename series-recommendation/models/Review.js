import { Model, DataTypes } from 'sequelize';
export default class Review extends Model {
  static init(sequelize) {
    return super.init({
      serieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Series',
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