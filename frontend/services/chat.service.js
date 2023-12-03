import axios from '@/helper/axios.helper';

class ChatService {

    static getMessByPost = async ({ buyerId, salerId, postId }) => {
        let url = '/api/chat/getbypost?'
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
    
    static getMessByUser = async ({ userId, role }) => {
        let url = '/api/chat/getbyuser?'
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
    static createdMess = async ({ buyerId, salerId, postId, content }) => {
        return axios.post('/api/chat/create', {
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

module.exports = ChatService