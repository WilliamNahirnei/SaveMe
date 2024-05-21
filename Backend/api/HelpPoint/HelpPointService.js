const HelpPointRepository = require('./HelpPointRepository')
const RequestUtils = require('../utils/RequestUtils')
const Formater = require('./HelpPointFormater')
const Preparer = require('./HelpPointPrepare')
const sequelize = require('../../database/database')
const AcceptableExeption = require('../CustomException/AcceptableException')
const CanEditEntity = require('../utils/CanEditEntity')
const Validations = require('../Validation/Validations')
const HelpPointRequest = require('./HelpPointRequest')


exports.index = async function (request) {
    const requestParams = RequestUtils.getRequestParams(request)

    return Formater.index(await HelpPointRepository.index())
}

exports.show = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)

    const helpPoint = await this.searchHelpPointById(requestParams.idHelpPoint)   

 
    return Formater.show(helpPoint)
}

exports.store = async function (request) {
    const requestParams = RequestUtils.getRequestParams(request)
    await Validations.validateObject(requestParams, HelpPointRequest.validateToStore())


    const helpPoint = await sequelize.transaction(async (transaction) => {
        options = {transaction: transaction}

        const preparedData = Preparer.prepareToStore(requestParams)
        
        const helpPoint = await HelpPointRepository.store(preparedData, {transaction})

        return helpPoint
    })
    return helpPoint

}

exports.update = async function (request, response) {
    const requestParams = RequestUtils.getRequestParams(request)
    await Validations.validateObject(requestParams, HelpPointRequest.validateToUpdate())
    
    const helpPoint = await this.searchHelpPointById(requestParams.idHelpPoint)

    await CanEditEntity.canEditEntity(helpPoint, request)


    return await sequelize.transaction(async (transaction) => {
        options = {transaction: transaction}

        const preparedData = Preparer.prepareToUpdate(helpPoint, requestParams)

        return await HelpPointRepository.update(helpPoint, preparedData)
    })
}

function haveHelpPoint(helpPoint) {
    return !!helpPoint
}

exports.searchHelpPointById = async function (idHelpPoint) {
    const helpPoint = await HelpPointRepository.show(idHelpPoint)
    if (!haveHelpPoint(helpPoint)) {
        throw new AcceptableExeption(true,'NOT FOUND', errorListMessage = ['HelpPointNotFound'], codeForRequest = 404)
    }
    return helpPoint
}