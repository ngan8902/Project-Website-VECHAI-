import axios from '@/helper/axios.helper';

class MessageService {

    static getMessageByPost = async ({ buyerId, salerId, postId }) => {
        let url = '/api/message/getbypost?'
        if(buyerId) url = url + `buyerId=${buyerId}&`
        if(salerId) url = url + `salerId=${salerId}&`
        if(postId) url = url + `postId=${postId}&`
        return axios.get(url).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }

    static getMessageByUser = async ({ userId, role }) => {
        let url = '/api/message/getbyuser?'
        if(userId) url = url + `userId=${userId}&`
        if(role) url = url + `role=${role}&`
        return axios.get(url).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }
    
    static createdMessage = async ({ buyerId, salerId, postId, content }) => {
        return axios.post('/api/message/create', {
            buyerId, salerId, postId, content
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

module.exports = MessageService