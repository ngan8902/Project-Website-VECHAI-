import Axios from '@/helper/axios.helper'

class PostService {

    static getPosts = async ({ limit, offset }) => {
        let url = '/api/post/get?'
        if(limit) url = url + `limit=${limit}&`
        if(offset) url = url + `offset=${offset}&`
        return Axios.get(url).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }

}

module.exports = PostService