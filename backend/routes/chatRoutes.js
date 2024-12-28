const express = require('express');
const {createChat, updateChat, deleteChat, getChats, getChat } = require('../controllers/chatController');

const router = express.Router();

router.post('/', createChat);
router.put('/:id', updateChat);
router.delete('/:id', deleteChat);
router.get('/', getChats);
router.get('/:id', getChat);

module.exports = router;