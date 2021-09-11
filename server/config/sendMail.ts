const nodemailer = require('nodemailer')
import { OAuth2Client } from "google-auth-library"

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`

//send mail
const sendEmail = async (to: string, url: string, txt: string) => {
    const oAuth2Client = new OAuth2Client(
        CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
    )
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN}) // Now tokens contains an access_token and an optional refresh_token. Save them.
    try {
        const access_token = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2', // indicates authentication type, set it to ‘OAuth2’
                user: SENDER_MAIL, // user email address (required)
                clientId: CLIENT_ID, // is the registered client id of the application
                clientSecret: CLIENT_SECRET, // is the registered client secret of the application
                refreshToken: REFRESH_TOKEN, // is an optional refresh token. If it is provided then Nodemailer tries to generate a new access token if existing one expires or fails
                access_token // is the access token for the user. Required only if refreshToken is not available and there is no token refresh callback specified
            }
        })
        const mailOptions = {
            from: SENDER_MAIL, // The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com', see Address object for details
            to: to, // Comma separated list or an array of recipients email addresses that will appear on the To: field
            subject: "Blog App", // The subject of the email
            html: `
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Blog App.</h2>
                    <p>Congratulations! You're almost set to start using BlogDEV.
                        Just click the button below to validate your email address.
                    </p>
                    
                    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                
                    <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                
                    <div>${url}</div>
                </div>
            ` // The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…'})
        } 
        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
       console.log(error)
    }   
}

export default sendEmail