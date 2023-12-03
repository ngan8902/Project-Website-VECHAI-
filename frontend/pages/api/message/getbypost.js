import { getMessageByPost } from '@/services/message.service'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const data = await getMessageByPost(req.query)
        if(data.err) {
            res.status(400).json(data)
        }
        res.status(200).json(data)
    } 
}
  