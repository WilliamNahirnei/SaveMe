const UserService = require('./UserService')
// const Validations = require('../validations/Validations')
// const UserRequest = require('./UserRequest')

exports.index = async function (request, response) {
    try {
        const userList = await UserService.index(request)
        response.send(userList)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.show = async function (request, response) {
    try {
        const user = await UserService.show(request, response)
        response.send(user)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.store = async function (request, response) {
    try{
        // await Validations.validateRequest(request, UserRequest.validateToStore())
        const user = await UserService.store(request)
        response.status(201).send(user)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.update = async function (request, response) {
    try {
        // await Validations.validateRequest(request, UserRequest.validateToUpdate())
        const user = await UserService.update(request, response)
        response.send(user)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.deactive = async function (request, response) {
    try {
        const user = await UserService.deactiveUser(request, response)
        response.send(user)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.active = async function (request, response) {
    try {
        const user = await UserService.activeUser(request, response)
        response.send(user)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.delete = async function (request, response) {
    try {
        const user = await UserService.delete(request, response)
        response.send(user)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}