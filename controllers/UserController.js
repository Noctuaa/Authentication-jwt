// Model
const User = require('../models/User');

class UserController {
    /**
     * Index User
     * @param {object} req 
     * @param {object} res
     * @returns {object} response user 
     */
    index = async (req, res) => {
        const user = await User.findOne({_id: res.user.id});
    
        await res.status(200).json({
            message: 'ok',
            email: user.email
        })
    }

}

module.exports = new UserController;