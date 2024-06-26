'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reviews', 'serieId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Series',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'serieId');
  }
};

