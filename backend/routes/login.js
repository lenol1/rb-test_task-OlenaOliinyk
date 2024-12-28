const express = require('express');
const router = express.Router();
const User = require('../models/user');

const logIn = async (req, res) => {
    const { googleData } = req.body;
    if (!googleData || !googleData.email) {
        return res.status(400).json({ message: "Invalid Google data" });
    }

    try {
        let user = await User.findOne({ email: googleData.email });
        if (!user) {
            const newUser = new User({
                username: googleData.name,
                email: googleData.email,
                picture: googleData.picture,
            });
            user = await newUser.save();
        }
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
router.post('/', logIn);

module.exports = router;