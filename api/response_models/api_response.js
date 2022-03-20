class ApiResponse {
    constructor(statusCode, data) {
        this.statusCode = statusCode
        this.data = data
    }

    static created(data) {
        return new ApiResponse(201, data ?? 'Created')
    }

    static success(data) {
        return new ApiResponse(200, data ?? 'Success')
    }

    static accepted(data) {
        return new ApiResponse(202, data ?? 'Accepted')
    }
}

module.exports = ApiResponse