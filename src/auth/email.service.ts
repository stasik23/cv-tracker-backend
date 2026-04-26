import nodemailer from 'nodemailer';
// Create a transporter object
interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: "kolesnikkosta572@email.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Send the email
export const sendEmail = async (mailOptions: MailOptions): Promise<void> => {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}