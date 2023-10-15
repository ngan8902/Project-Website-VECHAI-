import Axios from '@/helper/axios.helper'

class RoleService {

    static getRoles = async () => {
        return Axios.get('/api/role/get').then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }

}

module.exports = RoleService