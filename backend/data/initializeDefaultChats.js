const Chat = require('../models/chat');

const initializeDefaultChats = async () => {
    const defaultChats = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' },
        { firstName: 'Alice', lastName: 'Johnson' },
    ];
    const icons = [
        '/userIcons/female0.png', '/userIcons/female1.png', '/userIcons/female2.png',
        '/userIcons/female3.png', '/userIcons/female4.png', '/userIcons/female5.png',
        '/userIcons/male0.png', '/userIcons/male1.png', '/userIcons/male2.png',
        '/userIcons/male3.png', '/userIcons/male4.png', '/userIcons/male5.png'
    ];
    try {
        for (const chat of defaultChats) {
            let exists = await Chat.findOne({ firstname: chat.firstName, lastname: chat.lastName });
            if (!exists) {
                const randomIcon = icons[Math.floor(Math.random() * icons.length)];
                const newChat = new Chat({
                    firstname: chat.firstName,
                    lastname: chat.lastName,
                    picture: randomIcon
                });
                await newChat.save();
            }
        }
        console.log("Default chats initialized successfully");
    } catch (error) {
        console.error('Error initializing default chats:', error);
    }
};

module.exports = initializeDefaultChats;