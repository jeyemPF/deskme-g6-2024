// emailService.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deskmecompany@gmail.com',
        pass: 'mdtq dpwm utpf tfqb'
    }
});


export default transporter;
