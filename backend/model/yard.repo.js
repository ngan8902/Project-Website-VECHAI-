'use strict'


const { con } = require('../database/mysql')

class YardModel {
    static getRoles = async ({ limit, offset, sortType = 'DESC' }) => {
        return new Promise((resolve, reject) => {
            let query = 'SELECT * FROM yards INNER JOIN (select id, fullname, email, phonenumber, address, role_id, image as userImage from users) u ON posts.userId = u.id'
            query = query + ` ORDER BY updatedAt ${sortType}`
            if(limit) query = query + ` LIMIT ${limit}`
            if(offset) query = query + ` OFFSET ${offset}`
            con.query(query, function (error, results) {
                if (error) reject(error);

                resolve(results)
            })
        })
    }

    static create = async ({userId, address, name, open_time, image, lag_lat}) => {
        return new Promise((resolve, reject) => {
            con.query('INSERT INTO posts SET ?', {
                userId, address, name, open_time, image, lag_lat,
                createdAt: new Date(), updatedAt: new Date()
            }, function (error, results, fields) {
                if (error) reject(error)
                resolve(results)
            })
        })
    }

    static initTableToDB = async () => {
        var sql = `CREATE TABLE IF NOT EXISTS yards (
            yards_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,  
            name VARCHAR(255) NOT NULL,  
            image VARCHAR(255)  NOT NULL,
            open_time  VARCHAR(255)  NOT NULL,
            isDeleted BOOLEAN DEFAULT false,
            createdAt DATETIME ,
            updatedAt DATETIME,
            FOREIGN KEY (userId) REFERENCES users(id)
            )`;
        return con.querySync(sql);
    }
}
module.exports = YardModel