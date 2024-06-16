import connectMongoDB from '../../lib/mongodb';
import User from '../../models/User';

export default async function handler(req, res) {
    await connectMongoDB();

    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        return res.status(200).json({ success: true });
    }

    return res.status(401).json({ success: false });
}
