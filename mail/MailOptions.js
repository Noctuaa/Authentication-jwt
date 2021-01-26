const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");
const path = require('path');

class Mail {
    /**
     * Options Nodemailer
     * @returns {object} - Transporter nodemailer
     */
    transporter = () => {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: true
            },
        });
        
        const hbsOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialDir: path.resolve(__dirname, "views/partials"),
                defaultLayout: path.resolve(__dirname, "views/layouts/main"),
            },
            viewPath : path.resolve(__dirname, 'views/templates'),
            extName: ".handlebars",
        };

        transporter.use("compile", hbs(hbsOptions));

        return transporter;
    }
}

module.exports = new Mail;