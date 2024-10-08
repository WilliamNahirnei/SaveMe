'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HelpPoint', {
      idHelpPoint: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true
      },
      latitude: {
          type: Sequelize.STRING(300),
          allowNull: false,
          unique: false
      },
      longitude: {
          type: Sequelize.STRING(300),
          allowNull: true,
          unique: false
      },
      numberPeople: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false
      },
      numberAnimals: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false
      },
      details: {
          type: Sequelize.STRING(5000),
          allowNull: false,
          unique: false
      },     
      dateHour: {
          type: Sequelize.DATE,
          allowNull: false,
          unique: false,
      },
      idStatus: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Date');
  }
};