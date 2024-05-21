const Sequelize = require('sequelize')
const database = require('../../database/database.js')
 
const HelpPoint = database.define('HelpPoint', {
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
    },
    {tableName: 'HelpPoint'}
)

module.exports = HelpPoint