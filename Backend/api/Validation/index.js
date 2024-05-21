const Validations = require('./Validations')

validateToStore = function () {
    return [
        {name: 'fullName', validations:'required|string|min:4|max:50'},
    ]
}

const teste = {name: ""}

Validations.validateObject(teste, validateToStore())
.catch((e)=>console.log(e. errorListMessage))