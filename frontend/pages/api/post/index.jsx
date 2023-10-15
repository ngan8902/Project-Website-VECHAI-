import { getPosts } from '@/services/post.service'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const data = await getPosts(req.query)
        if(data.err) {
            res.status(400).json(data)
        }
        res.status(200).json(data)
    } else {
       
    }
}
  