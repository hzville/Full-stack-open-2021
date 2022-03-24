const User = require('../../models/user')

const getAllUsersFromDb = async () => {
    return await User.find({})
}

module.exports = {
    getAllUsersFromDb,
}
