'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      temporadas: {
        type: Sequelize.STRING, // Modificación para array de strings
        allowNull: false
      },
      servicio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estrellas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      calificaciones: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Series');
  }
};