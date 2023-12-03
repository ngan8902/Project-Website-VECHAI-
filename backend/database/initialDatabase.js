'use strict'

const { connection } = require('./mysql') // Destructuring
const UserModel = require('../model/user.repo')
const RoleModel = require('../model/role.repo')
const PostModel = require('../model/post.repo')
const YardModel = require('../model/yard.repo')
const MessageModel = require('../model/message.repo')

connection(async () => {
    try {
        await RoleModel.initTableToDB()
        await UserModel.initTableToDB() // promise
        await PostModel.initTableToDB()
        await YardModel.initTableToDB()
        await MessageModel.initTableToDB()
        console.log('All tables created success:::::')
    } catch(err) {
        console.log(err)
    }
    // Chạy xong thoát chương trình
    process.exit()
})