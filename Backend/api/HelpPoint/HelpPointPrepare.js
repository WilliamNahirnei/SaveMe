exports.prepareToStore = function (data) {
    return {
        latitude: data.latitude,
        longitude: data.longitude,
        numberPeople: data.numberPeople,
        numberAnimals: data.numberAnimals,
        details: data.details,
        dateHour: new Date(),
        idStatus: 1
    }
}

exports.prepareToUpdate = function (encounter, data) {
    return {
        idStatus: data.idStatus
    }
}