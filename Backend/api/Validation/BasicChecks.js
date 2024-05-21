const moment = require("moment")

function maxString (value, maxValueParam) {
    if (!maxValue(value.length, maxValueParam))
        return `deve ter no maximo ${maxValueParam} caracteres`
}

function minString (value, minValueParam) {
    if (!minValue(value.length, minValueParam))
        return `deve ter no minimo ${minValueParam} caracteres`
}

function minNumber (value, minValueParam) {
    if (!minValue(value, minValueParam))
        return `deve ser no minimo ${minValueParam}`
}

function maxNumber (value, maxValueParam) {
    if (!maxValue(value, maxValueParam))
        return `deve ser no maximo ${maxValueParam}`
}

function minValue (value, minValue) {
    return value >= minValue
}

function maxValue (value, maxValue) {
    return value <= maxValue
}

function equal (value, equalValue) {
    return value == equalValue
}

function sizeArray (array, size) {
    if(!equal(array.length, size))
        return `deve ter tamanho ${size}`
}

function type (value, expectedType) {
    return typeof(value) == expectedType
}

function isBoolean(value) {
    return type(value, "boolean")
}

function isNumber(value) {
    return type(value, "number")
}

function isString(value) {
    return type(value, "string")
}

function isValidDate(value, format) {
    return moment(value, format).isValid()
}

function isValidEmail(value) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
    return emailRegex.test(value)
}

module.exports = {
    maxString,
    minString,
    minNumber,
    maxNumber,
    sizeArray,
    isBoolean,
    isNumber,
    isString,
    isValidDate,
    isValidEmail
}