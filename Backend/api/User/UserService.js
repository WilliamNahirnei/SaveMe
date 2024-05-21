const UserRepository = require('./UserRepository')
const RequestUtils = require('../utils/RequestUtils')
const Formater = require('./UserFormater')
const Preparer = require('./UserPrepare')
const sequelize = require('../../database/database')
const AcceptableExeption = require('../CustomException/AcceptableException')

exports.index = async function (request) {
    const requestParams = RequestUtils.getRequestParams(request)
    return Formater.index(await UserRepository.index(), 'userList')
}

exports.show = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)
    const user = await UserRepository.show(requestParams.idUser)

    if (!haveUser(user)) {
        throw new AcceptableExeption(true,'NOT FOUND', errorListMessage = ['UserNotFound'], codeForRequest = 404)
    }

    return Formater.show(user, 'user')
}

exports.store = async function (request) {
    const requestParams = RequestUtils.getRequestParams(request)

    const user = await sequelize.transaction(async (transaction) => {
        options = {transaction: transaction}

        const preparedData = Preparer.prepareToStore(requestParams)

        const user = await UserRepository.store(preparedData, {transaction})

        return user
    })
    return user
}

exports.update = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)
    
    const user = await UserRepository.show(requestParams.idUser)

    if (!haveUser(user)) {
        throw new AcceptableExeption(true,'NOT FOUND', errorListMessage = ['UserNotFound'], codeForRequest = 404)
    }
    return await sequelize.transaction(async (transaction) => {
        options = {transaction: transaction}

        const preparedData = Preparer.prepareToUpdate(user, requestParams)

        return await UserRepository.update(user, preparedData)
    })
}

exports.deactiveUser = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)

    const user = await UserRepository.show(requestParams.idUser)

    if (!haveUser(user)) {
        throw new AcceptableExeption(true,'NOT FOUND', errorListMessage = ['UserNotFound'], codeForRequest = 404)
    }
    
    const preparedData = Preparer.prepareToDeactiveUser()

    return await UserRepository.update(user, preparedData)
}

exports.activeUser = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)
    
    const user = await UserRepository.show(requestParams.idUser)

    if (!haveUser(user)) {
        throw new AcceptableExeption(true,'NOT FOUND', errorListMessage = ['UserNotFound'], codeForRequest = 404)
    }

    const preparedData = Preparer.prepareToActiveUser()

    return await UserRepository.update(user, preparedData)
}

exports.delete = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)
    const user = await UserRepository.show(requestParams.idUser)

    if (!haveUser(user)) {
        throw new AcceptableExeption(true,'NOT FOUND', errorListMessage = ['UserNotFound'], codeForRequest = 404)
    }

    return await sequelize.transaction(async (transaction) => {
        options = {transaction: transaction}

        const userDelete = await UserRepository.delete(user)

        return userDelete
    })
}

function haveUser(user) {
    return !!user
}