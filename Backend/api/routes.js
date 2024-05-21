const UserController = require("./User/UserController")
const AuthController = require("./User/AuthController")
const AuthService = require("./User/AuthService")

const HelpPointController = require("./HelpPoint/HelpPointController")


module.exports = app => {
    app.route('/status')
        .get((req, res) => {
            res.send('online')
        })

///////////////// Autentication ////////////////////

    app.route('/signIn')
    .post((request, response) => {
        AuthController.signIn(request, response)
    })

    // app.route('/signUp')
    // .post((request, response) => {
    //     AuthController.signUp(request, response)
    // })

    app.route('/validateToken')
    .post((request, response) => {
        AuthController.validateToken(request, response)
    })
    
//////////////// User ///////////////////////

    app.route('/user')
        .post((request, response) => {
            UserController.store(request, response)
        })
        .all(AuthService.autenticateRequest().authenticate())
        .get((request, response) => {
            UserController.index(request, response)
        })

    app.route('/User/:idUser')
        .all(AuthService.autenticateRequest().authenticate())
        .get((request, response) => {
            UserController.show(request, response)
        })
    app.route('/user/:idUser')
        .put((request, response) => {
            UserController.update(request, response)
        })

    app.route('/user/:idUser/deactive')
        .all(AuthService.autenticateRequest().authenticate())
        .delete((request, response) => {
            UserController.deactive(request, response)
        })

    app.route('/user/:idUser/active')
        .all(AuthService.autenticateRequest().authenticate())
        .put((request, response) => {
            UserController.active(request, response)
        })

///////////////HelpPoint///////////////////////////////////////
    .post(
        (request, response) => {
        HelpPointController.store(request, response)
    })
    app.route('/helpPoint')
        .all(AuthService.autenticateRequest().authenticate())
        .get((request, response) => {
            HelpPointController.index(request, response)
        })

    app.route('/helpPoint/:idHelpPoint')
        .all(AuthService.autenticateRequest().authenticate())
        .get((request, response) => {
            HelpPointController.show(request, response)
        })

    app.route('/helpPoint/:idHelpPoint')
        .all(AuthService.autenticateRequest().authenticate())
        .put((request, response) => {
            HelpPointController.update(request, response)
        })

}