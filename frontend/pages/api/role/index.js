import { getRoles } from '@/services/role.service'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const data = await getRoles()
        if(data.err) {
            res.status(400).json(data)
        }
        res.status(200).json(data)
    } else {
       
    }
}
  