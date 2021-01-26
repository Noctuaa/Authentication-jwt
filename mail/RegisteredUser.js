const mail = require('./MailOptions');
let transporter = mail.transporter();

/**
 * Send an email Confirm the Account with the token.
 * @param {string} email 
 */
exports.mailConfirm = (email, name, headers, token, id) => transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: email,
    subject: "Account Verification Token",
    template: 'home',
    context: {
        user: name,
        host: process.env.APP_URL,
        token: token,
        appName: process.env.APP_NAME,
        id: id
    }
}, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        console.log('Server is ready to take our messages');
    }
})