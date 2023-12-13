import { createdMess } from '@/services/message.service'

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const response = await createdMess(req.body)
        if(!response && !response.data) return res.status(400).json(data)
        res.status(200).json(response.data)
    } 
}