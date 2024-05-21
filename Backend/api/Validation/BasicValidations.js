const checks = require("./BasicChecks")

validations = {}

validations.min = function min (value, minValue) {
    let validationMessage = ''
    if(checks.isString(value))
        validationMessage = checks.minString(value, minValue)
    else if(checks.isNumber(value))
        validationMessage = checks.minNumber(value, minValue)
    return validationMessage
}

validations.max = function max (value, maxValue) {

    if(checks.isString(value))
        return checks.maxString(value, maxValue)
    else if(checks.isNumber(value))
        return checks.maxNumber(value, maxValue)
}

validations.size = function size (value, size) {
    if(checks.isString(value))
        return checks.sizeArray(value, size)
}

validations.boolean = function boolean (value) {
    if (!checks.isBoolean(value))
        return 'deve ser no do tipo booleano'
}

validations.number = function number (value) {
    if (!checks.isNumber())
        return 'deve ser do tipo numerico'
}

validations.string = function string (value) {
    if (!checks.isString(value))
        return 'deve ser no do tipo string'
}


validations.date = function date (value, format) {
    if (!checks.isValidDate(value, format))
        return 'tem formato de data invalido'
}

validations.email = function email (value) {
    if (!checks.isValidEmail(value))
        return 'formato de email invalido'
}

module.exports = validations