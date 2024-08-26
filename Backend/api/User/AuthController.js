const UserService = require('./AuthService')
// const Validations = require('../validations/Validations')
// const UserRequest = require('./UserRequest')

exports.signIn = async function (request, response) {
    try{
        const authInfo = await UserService.signIn(request)
        response.status(200).send(authInfo)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}

// exports.signUp = async function (request, response) {
//     try{
//         // await Validations.validateRequest(request, UserRequest.validateToStore())
//         const authInfo = await UserService.signIn(request)
//         response.status(200).send(authInfo)
//     } catch (error) {
//         if (error?.codeForRequest)
//             response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
//         else
//             response.status(500).send({messages:['internal server error']})
//     }
// }

exports.validateToken = async function (request, response) {
    try{
        const validTokenInfo = await UserService.signIn(request)
        response.status(200).send(authInfo)
    } catch (error) {
        if (error?.codeForRequest)
            response.status(error.codeForRequest).send({error:error.type, messages:error.errorListMessage})
        else
            response.status(500).send({messages:['internal server error']})
    }
}