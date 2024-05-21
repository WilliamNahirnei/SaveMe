const autenticationTokenSecret = process.env.AUTH_SECRET
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const RequestUtils = require('../utils/RequestUtils')
const UserRepository = require('./UserRepository')
const User = require('./User')
const AcceptableExeption = require('../CustomException/AcceptableException')


const quantityDaysValidToken = process.env.DAYS_TO_EXPIRE_TOKEN

exports.signIn = async function (request, response) {
    const requestParams = request.body
    const user = await UserRepository.getByEmail(requestParams.userEmail)

    if (!(user instanceof User)) {
        throw new AcceptableExeption(true,'UNAUTHORIZED', errorListMessage = ['email or password do not match'], codeForRequest = 401)
    }

    const equalsPasswords = bcrypt.compareSync(requestParams.password, user.userPassword)

    if(!equalsPasswords) {
        throw new AcceptableExeption(true,'UNAUTHORIZED', errorListMessage = ['email or password do not match'], codeForRequest = 401)
    }

    const now = Math.floor(Date.now() / 1000)

    const authInfo = {
        userId: user.idUser,
        userName: user.userFullName,
        iat: now,
        expirationDate: now + (60*60 *24 * quantityDaysValidToken)
    }

    return {
        ...authInfo,
        autenticationToken: jwt.sign(authInfo, autenticationTokenSecret)
    }
}

exports.validateToken = async function (request, response) {
    const userData = request.body

    try {
        if (userData) {
            const token = jwt.decode(userData.token, autenticationTokenSecret)
            if (isValidateDateExpiration(token.expirationDate))
                return true
        }
    } catch(erro) {
        
    }

    return false
}

function isValidateDateExpiration(expirationDate) {
    return new Date(expirationDate) > new Date
}

exports.autenticateRequest = function() {
    const params = {
        secretOrKey: autenticationTokenSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        const now = Math.floor(Date.now() / 1000)

        if(payload.expirationDate <= now) {
            return done(null, false);
        }

        return UserRepository.show(payload.userId)
        .then(user => done(null, user ? { ...payload } : false))
        .catch(erro => done(erro, false))
    })
    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session:false })
    }

}

exports.injectUserInBodyRequest = (request, response, next) =>{
    request.body.user = request.user
    next();
}