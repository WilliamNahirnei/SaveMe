const User = require('./User')
const { applyFilters } = require('../DatabaseSuport/WhereSuport');
const FILTER_FIELDS = require('./UserFilters');

exports.index = async function (filters) {
    const whereClause = applyFilters(filters, FILTER_FIELDS);
    if (Object.keys(whereClause).length === 0) {
        return await User.findAll();
    }

    return await User.findAll({
        where: whereClause
    });
};

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