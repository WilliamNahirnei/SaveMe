'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      userFullName: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: false
      },
      userBirthDate: {
          type: Sequelize.DATEONLY,
          allowNull: true,  
          unique: false
      },
      userEmail: {
          type: Sequelize.STRING(150),
          allowNull: false,
          unique: true,
      },

      userPassword: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: false,
      },

      userStatus: {
          type: Sequelize.ENUM('active', 'inactive'),
          allowNull: false,
          defaultValue: 'active'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};