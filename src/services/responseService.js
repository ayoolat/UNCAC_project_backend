exports.responseService = (status, data, message) => {
    return{
        status,
        data,
        message
    }
}