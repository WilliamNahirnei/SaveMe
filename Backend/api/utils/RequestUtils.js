exports.getRequestParams = function(request) {
    return {
        ...request.params,
        ...request.query,
        ...request.body
    }
}