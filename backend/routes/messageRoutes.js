const express = require('express');
const {createMessage, updateMessage, deleteMessage, getMessages, getLastMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);
router.get('/', getMessages);
router.get('/last/:chatId', getLastMessage);

module.exports = router;