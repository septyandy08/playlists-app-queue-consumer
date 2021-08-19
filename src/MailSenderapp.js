const nodemailer = require("nodemailer");

class MailSenderapp {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    sendEmailapp(targetEmail, content) {
        const message = {
            from: 'openmusic-api-songsapp',
            to: targetEmail,
            subject: 'Eksport Playlists Lagu',
            text: 'Terlampir hasil dari eksport playlists lagu',
            attachments: [
                {
                    filename: 'playlists-songapp.json',
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSenderapp;
