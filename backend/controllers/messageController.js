const { Message, Chat } = require('../models/index');

const createMessage = async (req, res) => {
    try {
        const { chat, text, person, autoAnswer } = req.body;

        if (!chat || !text || !person) {
            return res.status(400).json({ message: 'Chat, text, and sender are required' });
        }
        
        const newMessage = new Message({
            chat,
            text,
            person,
            autoAnswer: autoAnswer !== undefined ? autoAnswer : null,
        });
        const savedMessage = await newMessage.save();

        const _chat = await Chat.findById(req.body.chat);
        _chat.date_of_modification = new Date();
        await _chat.save();

        res.status(201).json(savedMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const _message = await Message.findById(req.params.id);
        if (!_message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        _message.text = text;
        _message.date_of_modification = Date.now();
        await _message.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const _message = await Message.findById(req.params.id);
        if (!_message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        await Message.findByIdAndDelete(req.params.id);

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getMessages = async (req, res) => {
    try {
        const { chat } = req.query;
        const query = chat ? { chat } : {}; 
        const messages = await Message.find(query).populate({ path: 'person', model: 'users', select: 'name' });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getLastMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const message = await Message.find({ chat: chatId }).sort({ $natural: -1 }).limit(1);
        if (!message || message.length === 0) {
            return res.status(200).json(null);
        }
        const result = message[0].text;
        res.status(200).json({result});
    } catch (error) {
        console.error('Error fetching last message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createMessage,
    updateMessage,
    deleteMessage,
    getMessages,
    getLastMessage
}