import Axios from '@/helper/axios.helper'

class YardService {

    static getYard = async () => {
        return Axios.get('/api/yard/get').then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }

    static createdYard = async ({ userId, address, name, open_time, image, lag_lat }) => {
        return Axios.post('/api/yard/create', {
            userId, address, name, open_time, image, lag_lat,
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

module.exports = YardService