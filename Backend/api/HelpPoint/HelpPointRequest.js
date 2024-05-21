exports.validateToStore = function () {
    return [
        {name: 'latitude', validations:'required|string|max:300'},
        {name: 'longitude', validations:'required|string|max:300'},
        {name: 'details', validations:'string|min:0|max:5000'},
        {name: 'numberPeople', validations:'int|min:0|max:1000'},
        {name: 'numberAnimals', validations:'int|min:0|max:1000'},


    ]
}

exports.validateToUpdate = function () {
    return [
        {name: 'idStatus', validations:'required|int'},
    ]
}

const example = {
    "latitude": "258758453487",
    "longitude": "24578654654",
    "details": "Presos no andar de cima do sobrado",
    "numberPeople": 3,
    "numberAnimals": 2,

}