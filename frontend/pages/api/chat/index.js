import { createdMess } from '@/services/chat.service'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = await createdMess(req.body)
        if(data.err) {
            res.status(400).json(data)
        }
        res.status(200).json(data)
    } 
}
