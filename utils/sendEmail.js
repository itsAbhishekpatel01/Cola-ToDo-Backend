const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, text)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // you can use any SMTP service like Gmail, Outlook
            auth:{
                user: "team.colatodo@gmail.com",
                pass: `${process.env.APP_PASSWORD}`
            },
        })

        const mailOptions = {
            from: 'itsabhishekpatel01@gmail.com',
            to: email,
            subject: subject,
            html: text
        }
        await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully');
    } catch (error) {
        console.log('Error sending mail:', error);
    }
}

module.exports = sendEmail;