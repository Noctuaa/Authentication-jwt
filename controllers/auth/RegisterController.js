//Middleware
const bcrypt = require('bcrypt');
const strRandom = require('../../helpers/strRandom');

//Model
const User = require('../../models/User');

//Mail
const registeredMail = require('../../mail/RegisteredUser');

class RegisterController {
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
    }
}

module.exports = new RegisterController;