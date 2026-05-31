import nodemailer from 'nodemailer';
interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "kolesnikkosta572@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN_SECRET,
  },
});

export const sendEmail = async (mailOptions: MailOptions): Promise<void> => {
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent: ', info.response);
        }
    });
}