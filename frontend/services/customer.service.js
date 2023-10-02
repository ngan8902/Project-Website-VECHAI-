import Axios from '@/helper/axios.helper'

class CustomerService {

    static signUp = async (fullname, email, password) => {
        return Axios.post('/api/customer/signup', {
            email,
            password,
            fullname
        }).then((response) => {
            const { data } = response
            return data
        }).catch((err) => {
            return {
                err: err.message
            }
        })
    }
    static logIn = async (email, password) => {
        return Axios.post('/api/customer/login',{
            email,
            password
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

module.exports = CustomerService