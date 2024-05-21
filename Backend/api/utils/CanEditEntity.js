
const AcceptableExeption = require('../CustomException/AcceptableException')

exports.canEditEntity = async function(entity, request) {

    if (entity.user_id != request.user.userId) {
        throw new AcceptableExeption(true,'UNAUTORIZED', errorListMessage = ['CantEditRegisterOtherUser'], codeForRequest = 403)
    }

}