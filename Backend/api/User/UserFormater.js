exports.index = function(listOfData) {
    return {
        userList: listOfData,
        total: listOfData.length
    }
}

exports.show = function(data) {
    return {
        user: data,
    }
}