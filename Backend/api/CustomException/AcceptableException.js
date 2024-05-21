class AcceptableExeption {
    constructor(accept = true, type = 'error', errorListMessage = [], codeForRequest = 500) {
        this.accept = accept
        this.type = type
        this.errorListMessage = errorListMessage
        this.codeForRequest = codeForRequest
    }
}

module.exports = AcceptableExeption