const database = require('./database.js')
const User = require ('../api/User/User.js')

module.exports = async function SynchronizeDatabase() {
    try {
        const response = await database.sync({force: true})
    } catch (error) {
        console.log("Error in Database Synchronization |:",error)
    }
}