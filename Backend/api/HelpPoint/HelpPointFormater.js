exports.index = function(listOfData) {
    return {
        list: listOfData,
        total: listOfData.length
    }
}

exports.show = function(data) {
    return data
}