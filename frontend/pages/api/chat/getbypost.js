import { getMessByPost } from '@/services/chat.service'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const data = await getMessByPost(req.query)
        if(data.err) {
            res.status(400).json(data)
        }
        res.status(200).json(data)
    } 
}
