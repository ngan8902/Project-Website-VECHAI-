const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const CLIENT_ID = process.env['DRIVE_CLIENT_ID']
const CLIENT_SECRET = process.env['DRIVE_CLIENT_SECRET']
const REDIRECT_URI = process.env['DRIVE_REDIRECT_URI']
const REFRESH_TOKEN = process.env['DRIVE_REFRESH_TOKEN']

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const driver = google.drive({
    version: 'v3',
    auth: oAuth2Client
})

class UploadFileHelper {

    static setFilePublic = async (fileId) => {
        try {
            await driver.permissions.create({
                fileId: fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })

            const getUrl = await driver.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink'
            })
            return getUrl
        } catch (err) {
            console.log(err)
        }
    }

    static uploadFile = async (imagePath, { imgName, shared }) => {
        try {
            const createFile = await driver.files.create({
                requestBody: {
                    name: imgName || 'newimage',
                    mimeType: 'image/jpg'
                },
                media: {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream(path.join(__dirname, imagePath))
                }
            })
            console.log(createFile.data)
            if (shared) {
                const { id } = createFile.data
                const getUrl = await UploadFileHelper.setFilePublic(id)
                console.log(getUrl.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    static deleteFile = async (id) => {
        try {
            const deleteFile = await driver.files.delete({
                fileId: id
            })

            console.log(deleteFile.data)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UploadFileHelper