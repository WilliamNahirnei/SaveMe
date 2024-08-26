const bcrypt = require('bcrypt')


exports.prepareToStore = function (data) {
    return {
        userFullName: data.fullName,
        userBirthDate: data.birthDate,
        userEmail: data.email,
        userPassword: encryptPassword(data.password),
    }
}

exports.prepareToUpdate = function (User, data) {
    return {
        userFullName: data.fullName ? data.fullName : User.userFullName,
        userBirthDate: data.birthDate ? data.birthDate : User.userBirthDate,
        userEmail: data.email ? data.email : User.userEmail,
        userEmail: data.password ? data.password : User.userPassword,
    }
}

exports.prepareToDeactiveUser = function () {
    return {
        userStatus: 'inactive'
    }
}

exports.prepareToActiveUser = function () {
    return {
        userStatus: 'active'
    }
}

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}