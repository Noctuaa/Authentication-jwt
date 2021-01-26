const User = require('../../models/User');

class VerificationController {
    /**
     * Check the token to activate the account
     * @param {object} req 
     * @param {object} res 
     * @returns {object} response
     */
    verify = async (req, res) => {
        try {
            const { id, token } = req.body;
            const user = await User.findOne({ _id: id});

            if(!token || token !== user.emailToken){return res.status(401).json({message: "Token not found"})};
            if(user.isVerified){return res.status(401).json({message: "Your account is already activated."})};

            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            res.status(200).json({ message: "Account Confirmed."})
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

module.exports = new VerificationController;