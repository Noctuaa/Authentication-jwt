//Middleware
const bcrypt = require('bcrypt');
const jwt = require('../../middleware/jwt');

//Model
const User = require('../../models/User');

class LoginController { 
    /**
     * Login User.
     * @param {object} req 
     * @param {object} res 
     * @returns {object} response user
     */
    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({ email})
            if(!user) {return res.status(401).json({email: { "msg": "Email is wrong"}})};
            
            const match = await bcrypt.compare(password, user.password);
            if(!match) {return res.status(401).json({password: { "msg": "Password incorrect"}})}
            if(!user.isVerified) {return res.status(401).json({message: "Confirm your account.\nCheck your emails."})}

            const payload = {
                name: user.username,
                id: user._id
            };

            jwt.generate(payload);

            res.status(200).json({
                message: "You are Connected !",
                user: payload,
                token: jwt.token
            })
        } catch (error) {
            res.status(500).json({ error });
        }
    };
}

module.exports = new LoginController;




