const jwt = require('./jwt');

/**
 * Check if the user is authenticated
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] || req.headers.authorization || req.body.token;

        if(!token) { throw new Error('No token provided.')}

        const decodedToken = jwt.verify(token);

        if(!decodedToken) {throw new Error('Failed to authenticate token.')};
       
        const userId = decodedToken.id;

        if (req.body.id && req.body.id !== userId) {
            throw 'User ID invalid';
        } else {
            res.user = decodedToken;
            return next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Authentification Failed' });
    }
};

module.exports = {
    authenticate
}