const User = require('./User')

exports.index = async function () {
    return await User.findAll()
}

exports.show = async function (idUser) {
    return await User.findByPk(idUser)
}

exports.getByEmailWithPassword = async function (userEmail) {
    return await User.scope('withPassword').findOne({ where: { userEmail: userEmail } })
}

exports.store = async function (UserData, options = null) {
    return await User.create(UserData, options)
}

exports.update = async function (User, UserData, options = null) {
    return await User.update(UserData, options)
}

exports.delete = async function (User, options = null) {
    return await User.destroy()
}