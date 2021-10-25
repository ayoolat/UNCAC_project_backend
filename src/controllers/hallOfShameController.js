const hallOfShameService = require('../services/hallOfShameService')

exports.addToHallOfShame = async(request, response) => {
    const {fullName, crime, consequence, gender} = request.body
    const res = await hallOfShameService.addToHallOfShame(fullName, crime, consequence, gender)
    response.send(res)
}

exports.addImage = async(request, response) => {
    const {hallOfShameId} = request.params
    const res = await hallOfShameService.uploadImage(request.files, hallOfShameId)
    response.send(res)
}

exports.viewToHallOfShame = async(request, response) => {
    const res = await hallOfShameService.getAllFromHallOfShame()
    response.send(res)
}