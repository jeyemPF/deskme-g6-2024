// emailService.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'johmmackfaeldonia',
        pass: 'ppyq otrk jmiv bsbu'
    }
});


export default transporter;
