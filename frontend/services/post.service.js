import axios from '@/helper/axios.helper';

class PostService {

    static getPosts = async ({ limit, offset }) => {
        let url = '/api/post/get?'
        if(limit) url = url + `limit=${limit}&`
        if(offset) url = url + `offset=${offset}&`
        return axios.get(url).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }
    
    static createdPost = async ({ userId, name, content, image, expect_price }) => {
        return axios.post('/api/post/create', {
            userId, name, content, image, expect_price
        }).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            console.log(err)
            return {
                err: err.message
            }
        })
    }

    static detailPost = async ({ userId, name, content, image, expect_price }) => {
        return axios.post('/api/post/detail', {
            userId, name, content, image, expect_price
        }).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            console.log(err)
            return {
                err: err.message
            }
        })
    }
}

module.exports = PostService