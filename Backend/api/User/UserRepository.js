const User = require('./User')
const { mountObjectDefaultToSelect } = require('../DatabaseSuport/WhereSuport');
const FILTER_FIELDS = require('./UserFilters');

exports.index = async function (filters, paginationData) {
    objectToSelect = mountObjectDefaultToSelect(
        {
            filters,
            filterFields: FILTER_FIELDS
        }, 
        paginationData
    )

    const users = await User.findAndCountAll(objectToSelect);
    const totalPages = Math.ceil(users.count / paginationData.pageSize);

    return {
        total: users.count,
        page: paginationData.page,
        totalPages,
        users: users.rows
    };
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