const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db/connection');
const userRoute = require('./routes/userRoutes');
const messageRoute = require('./routes/messageRoutes');
const loginRoutes = require('./routes/login');
const chatRoutes = require('./routes/chatRoutes');
const initializeDefaultChats = require('./data/initializeDefaultChats');
const app = express();
const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
    initializeDefaultChats();

    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => {
        res.send("App is Working");
    });

    app.use("/user", userRoute);
    app.use("/message", messageRoute);
    app.use("/login", loginRoutes);
    app.use("/chats", chatRoutes);

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch((error) => {
    console.error('Error connecting to database:', error);
});