const ObjectErrorValidation = require("./ObjectErrorValidation")
const validations = require("./BasicValidations")

exports.validateObject = async function (object, validationList) {
    const errorList = await iterateAtributes(object,validationList)

    if (errorList.length > 0)
        throw new ObjectErrorValidation(true, 'Unprocessable Entity', errorList, codeForResponse = 422)
}

function iterateAtributes (object, atributeList) {
    const atributesWithErros = []
    atributeList.forEach(atribute => {
        const atributeName = atribute.name
        const validationList = extractValidationList(atribute.validations)
        const atributeValue = getValueOfObject(object, atributeName)
        requiredIndex = required(validationList)
        nullableIndex = nullable(validationList)


        const AtributeErrors = {}
        AtributeErrors[atributeName] = []

        haveAtribute = haveAtributeInObject(object, atributeName)
        if (requiredIndex >= 0) {
            if(!haveAtribute)
                AtributeErrors[atributeName].push('É obrigatorio')

            validationList.splice(requiredIndex, 1)
        }
        if (haveAtribute) {
            if (nullableIndex < 0 && !atributeValue) {
                AtributeErrors[atributeName].push('Não pode ser Nulo')
            }
            if (atributeValue) {
                if(nullableIndex >= 0)
                    validationList.splice(nullableIndex, 1)

                const errosofAtribute = iterateValidationList(validationList, atributeValue)
                AtributeErrors[atributeName] =  AtributeErrors[atributeName].concat(errosofAtribute)
            }
        }
        if (atributeHaveErrors(AtributeErrors[atributeName]))
            atributesWithErros.push(AtributeErrors)
    })
    return atributesWithErros
}

function iterateValidationList (validationList, atributeValue) {
    const errorsInAtribute = []
    validationList.forEach(atribute => {
        const validationError = executeValidation(atribute, atributeValue)
        if(validationError)
            errorsInAtribute.push(validationError)
    })
    return errorsInAtribute
}

function extractValidationList (validationStringList) {
    const validationList = validationStringList.split('|')
    return validationList
}

function extractValidationInformation (validation) {
    const validationData = validation.split(':')
    return {
        validationName: validationData[0],
        validationParams: extractValidationParams(validationData[1]) || []
    }
}

function executeValidation (atribute, atributeValue) {
    const validationData = extractValidationInformation(atribute)
    return validations[validationData.validationName](atributeValue, ...(validationData.validationParams))
}

function extractValidationParams (stringParams) {
    if(stringParams)
        return stringParams.split(',')
}

function haveAtributeInObject(object, paramName) {
    return !!object[paramName]
}

function getValueOfObject (object, paramName) {
    return object[paramName]  || null
}

function atributeHaveErrors(AtributeErrors) {
    return AtributeErrors.length >0
}

function atributeListHaveErrors(ListAtributesWithErrors) {
    return ListAtributesWithErrors.length >0
}

function required (validationList) {
    const requiredIndex = validationList.indexOf('required')
    return requiredIndex
}

function nullable (validationList) {
    const nullableIndex = validationList.indexOf('nullable')
    return nullableIndex
}