//Middleware
const bcrypt = require('bcrypt');
const jwt = require('../middleware/jwt');
const strRandom = require('../helpers/strRandom');

//Model
const User = require('../models/User');

//Mail
const registeredMail =  require('../mail/RegisteredUser');

class AuthController {
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

    /**
     * Register new user
     * @param {object} req 
     * @param {object} res 
     * @returns {object} response
     */
    register = async (req, res) => {  
        try {
            const { username, email, password } = req.body;
            const emailIsExist = await User.findOne({ email});
            const usernameIsExist = await User.findOne({ username });
            const errors = {};

            if(emailIsExist) {errors['email'] = {"msg" : "Email already exists."}}
            if(usernameIsExist){ errors['username'] = {"msg" : "Username already exists."}}
            if(emailIsExist || usernameIsExist) { return res.status(401).json(errors);}     


            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const token = strRandom.generate(60);


            const user = new User({
                username: username,
                email: email,
                password: hash,
                emailToken: token
            })
            
            await user.save();
            await registeredMail.mailConfirm(user.email, user.username, req.headers.host, user.emailToken, user._id);
            res.status(201).json({message: `Account created ! \nPlease check your email.`});

        } catch (error) {
            res.status(500).json({error});
        }
    };

    /**
     * Check the token to activate the account
     * @param {object} req 
     * @param {object} res 
     * @returns {object} response
     */
    verifyAccount = async (req, res) => {
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

module.exports = new AuthController;