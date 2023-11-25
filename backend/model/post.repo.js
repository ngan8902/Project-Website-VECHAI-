'use strict'


const { con } = require('../database/mysql')

class PostModel {

    static getRoles = async ({ limit, offset, sortType = 'DESC' }) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM posts INNER JOIN (select id, fullname, email, phonenumber, address, role_id, image as userImage from users) u ON posts.userId = u.id'
            query = query + ` ORDER BY updatedAt ${sortType}`
            if (limit) query = query + ` LIMIT ${limit}`
            if (offset) query = query + ` OFFSET ${offset}`
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }

    static create = async ({ userId, name, content, image, expect_price, items, status = 'draft' }) => {
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO posts SET ?', {
                userId, name, content, image, expect_price, items, status,
                createdAt: new Date(), updatedAt: new Date()
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }

    static detail = async ({ }) => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM posts WHERE post_id = '${post_id}'`, 
            function (err, data, fields) {
                if (err) reject(err)
                resolve(results)
            })
        })
    }

    static initTableToDB = async () => {
        var sql = `CREATE TABLE IF NOT EXISTS posts (
            post_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,  
            name VARCHAR(255) NOT NULL,
            content TEXT,  
            image VARCHAR(255)  NOT NULL,
            expect_price DOUBLE,
            items TEXT,
            approve_request INT,
            status ENUM('draft', 'publish', 'close'),
            isDeleted BOOLEAN DEFAULT false,
            createdAt DATETIME ,
            updatedAt DATETIME,
            FOREIGN KEY (userId) REFERENCES users(id)
            )`;
        return con.querySync(sql);
    }

}
module.exports = PostModel