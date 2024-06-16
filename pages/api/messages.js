import connectMongoDB from '../../lib/mongodb';
import Chat from '../../models/Chat';

export default async function handler(req, res) {
    await connectMongoDB();

    if (req.method === 'GET') {
        const messages = await Chat.find({});
        return res.status(200).json({ messages });
    }

    if (req.method === 'POST') {
        const { message, username } = req.body;
        const chatMessage = new Chat({ message, username });
        await chatMessage.save();
        return res.status(201).json({ message: chatMessage });
    }

    return res.status(405).end(); // Method Not Allowed
}
