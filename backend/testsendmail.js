// const { google } = require('googleapis')
// const nodemailer = require('nodemailer')
// require('dotenv').config()

// const CLIENT_ID = process.env['CLIENT_ID']
// const CLIENT_SECRET = process.env['CLIENT_SECRET']
// const REDIRECT_URI = process.env['REDIRECT_URI']
// const REFRESH_TOKEN = process.env['REFRESH_TOKEN']

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

// const sendMail = async () => {
//     try {
//       const accessToken = await oAuth2Client.getAccessToken();
//       const transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           type: "OAuth2",
//           user: "marketing.chintacoffeevn@gmail.com",
//           clientId: CLIENT_ID,
//           clientSecret: CLIENT_SECRET,
//           refreshToken: REFRESH_TOKEN,
//           accessToken: accessToken,
//         },
//       });

//       // send mail with defined transport object
//       const info = await transport.sendMail({
//         from: '"Fred Foo 👻" marketing.chintacoffeevn@gmail.com', // sender address
//         to: "bichnganb722@gmail.com, huy.nguyen22994@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//       });

//       console.log(info)
//     } catch (err) {
//         console.log(err)
//     }
// }

// sendMail()

const { sendMail } = require('./helper/mailhelper')

sendMail({
  to: 'bichnganb722@gmail.com',
  subject: 'Hi',
  text: 'hollo',
  html:'<p>Hello</p>'
})
