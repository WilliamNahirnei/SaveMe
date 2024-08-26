const Sequelize = require('sequelize')
const database = require('../../database/database.js')
 
const User = database.define('User', {
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
    }
},
{
    tableName: 'User',
    defaultScope: {
        attributes: { exclude: ['userPassword'] },
    },
    scopes: {
        withPassword: {
            attributes: {},
        }
    },
})

module.exports = User