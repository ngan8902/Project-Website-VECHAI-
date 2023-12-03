'use strict'


const { con } = require('../database/mysql')

class ChatModel {

    static getMessByPost = async ({buyerId, salerId, postId}) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM mess 
            INNER JOIN (select post_id, userID as post_userId, name as post_name, image as post_image, expect_price as post_expect_price, items as post_items, approve_request as post_approve_request, status as post_status from posts) p ON mess.post_id = p.post_id
            INNER JOIN (select id as buyer_id, fullname as buyer_fullname, email as buyer_email, phonenumber as buyer_phonenumber, address as buyer_address, role_id as buyer_role, image as buyer_image from users) b ON mess.buyer_id = b.buyer_id
            INNER JOIN (select id as sale_id, fullname as sale_fullname, email as sale_email, phonenumber as sale_phonenumber, address as sale_address, role_id as sale_role, image as sale_image from users) s ON mess.saler_id = s.sale_id
            WHERE mess.buyer_id = ${buyerId} AND mess.saler_id = ${salerId} AND mess.post_id = ${postId}
            `
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }

    static getAllMessageByUser = async ({ userId, role }) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * 
            FROM mess 
            INNER JOIN (select post_id, userId as post_userId, name as post_name, content as post_content, image as post_image, expect_price as post_expectprice, approve_request as post_approve_request, status as post_status from posts) p ON mess.post_id = p.post_id
            INNER JOIN (select id as buyer_id, fullname as buyer_fullname, email as buyer_email, phonenumber as buyer_phonenumber, address as buyer_address, role_id as buyer_role, image as buyer_image from users) b ON mess.buyer_id = b.buyer_id
            INNER JOIN (select id as saler_id, fullname as saler_fullname, email as saler_email, phonenumber as saler_phonenumber, address as saler_address, role_id as saler_role, image as saler_image from users) s ON mess.saler_id = s.saler_id
            `
            switch(role) {
                case 'saler':
                    query += ` WHERE mess.saler_id = ${userId}`
                    break
                case 'buyer':
                    query += ` WHERE mess.buyer_id = ${userId}`
                    break
                default:
                    reject('Nothing!!')
            }
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }

    static getMessById = async ({mssId}) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM mess 
            INNER JOIN (select post_id, userID as post_userId, name as post_name, image as post_image, expect_price as post_expect_price, items as post_items, approve_request as post_approve_request, status as post_status from posts) p ON mess.post_id = p.post_id
            INNER JOIN (select id as buyer_id, fullname as buyer_fullname, email as buyer_email, phonenumber as buyer_phonenumber, address as buyer_address, role_id as buyer_role, image as buyer_image from users) b ON mess.buyer.id = b.id
            INNER JOIN (select id as sale_id, fullname as sale_fullname, email as sale_email, phonenumber as sale_phonenumber, address as sale_address, role_id as sale_role, image as sale_image from users) s ON mess.saler.id = s.id
            WHERE mess.mss_id = ${mssId}`
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }

    static create = async ({ buyerId, salerId, postId, content}) => {
        return new Promise( async (resolve, reject) => {
            const findMssg = await ChatModel.getMessByPost({buyerId, salerId, postId})
            console.log(findMssg)
            if (findMssg) resolve(findMssg)

            const contentStr = JSON.stringify(content)
            con.query('INSERT INTO mess SET ?', {
                post_id: postId, buyer_id: buyerId, saler_id: salerId, content: contentStr,
                createdAt: new Date(), updatedAt: new Date()
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }

    static initTableToDB = async () => {
        var sql = `CREATE TABLE IF NOT EXISTS mess (
            mss_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            post_id INT NOT NULL,  
            buyer_id INT NOT NULL,
            saler_id INT NOT NULL,
            content TEXT,
            isDeleted BOOLEAN DEFAULT false,
            createdAt DATETIME ,
            updatedAt DATETIME,
            FOREIGN KEY (post_id) REFERENCES posts(post_id),
            FOREIGN KEY (buyer_id) REFERENCES users(id),
            FOREIGN KEY (saler_id) REFERENCES users(id)
            )`;
        return con.querySync(sql);
    }

}
module.exports = ChatModel