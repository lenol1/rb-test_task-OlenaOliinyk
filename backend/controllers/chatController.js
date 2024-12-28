const { Chat } = require('../models/index');

const createChat = async (req, res) => {
    try {
        const newChat = new Chat(req.body);
        const _chat = await newChat.save();
        res.status(201).json(_chat);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const updateChat = async (req, res) => {
    try {
        const { firstname, lastname, picture } = req.body;
        const _chat = await Chat.findById(req.params.id);
        if (!_chat) {
            return res.status(404).json({ message: 'Message not found' });
        }
        _chat.firstname = firstname;
        _chat.lastname = lastname;
        _chat.picture = picture
        await _chat.save();
        res.json(_chat);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteChat = async (req, res) => {
    try {
        const _chat = await Chat.findById(req.params.id);
        if (!_chat) {
            return res.status(404).json({ message: 'Message not found' });
        }
        await Chat.findByIdAndDelete(req.params.id);

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getChats = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        let chats;

        if (searchTerm) {
            const escapedTerm = escapeRegExp(searchTerm);
            const regex = new RegExp(escapedTerm, 'i');
            chats = await Chat.find({
                $or: [
                    { firstname: { $regex: regex } },
                    { lastname: { $regex: regex } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $concat: ["$firstname", " ", "$lastname"] },
                                regex: escapedTerm,
                                options: 'i',
                            },
                        },
                    },
                ],
            });
        } else {
            chats = await Chat.find();
        }

        res.status(200).json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createChat,
    updateChat,
    deleteChat,
    getChats,
    getChat
}