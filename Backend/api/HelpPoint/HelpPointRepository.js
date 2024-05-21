const HelpPoint = require('./HelpPoint')

exports.index = async function () {
    return await HelpPoint.findAll()
}

exports.show = async function (idHelpPoint) {
    return await HelpPoint.findByPk(idHelpPoint, {})
}

exports.store = async function (helpPointData, options = null) {
    return await HelpPoint.create(helpPointData, options)
}

exports.update = async function (helpPoint, helpPointData, options = null) {
    return await helpPoint.update(helpPointData, options)
}