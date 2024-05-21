const HelpPointService = require('./HelpPointService')

exports.index = async function (request, response) {
    // try {
        const helpPointList = await HelpPointService.index(request)
        response.send(helpPointList)
    // } catch (error) {
    //     if (error?.codeForRequest)
    //         response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
    //     else
    //         response.status(500).send({messages:['internal server error']})
    // }
}

exports.show = async function (request, response) {
    try {
        const helpPoint = await HelpPointService.show(request, response)
        response.send(helpPoint)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.store = async function (request, response) {
    try{
        const helpPoint = await HelpPointService.store(request)
        response.status(201).send(helpPoint)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.update = async function (request, response) {
    try {
        const helpPoint = await HelpPointService.update(request, response)
        response.send(helpPoint)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

exports.delete = async function (request, response) {
    try {
        const helpPoint = await HelpPointService.delete(request, response)
        response.send(helpPoint)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}