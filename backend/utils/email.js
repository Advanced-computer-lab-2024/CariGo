const nodemailer = require('nodemailer');

const sendEmail = async (email,subject,message) => {
    // 1) Create a transporter
    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });


    const transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    // 2) Define the email options
    const mailOptions = {
        from: '"CariGo 🦌" <noreply@cariGo.com>',
        to: email,
        subject: subject,
        text: message
    };

    // 3) Actually send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error); // Log the actual error
        throw new Error('Email sending failed');
    }
};


module.exports = sendEmail;