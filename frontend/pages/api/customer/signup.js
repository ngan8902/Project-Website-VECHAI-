import { signUp } from '@/services/customer.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const {fullname, email, password } = req.body
        const data = await signUp(fullname, email, password)
        if(data.err) {
            res.status(400).json(data)
        }
        res.status(200).json(data)
    } else if(req.method === 'GET') {
       
    } else {
       
    }
}
  