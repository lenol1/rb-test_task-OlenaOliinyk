const express = require('express');
const {createUser, updateUser, getUsers, getUserById, getUserIdByEmail } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.put('/', updateUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/email/:email', getUserIdByEmail);

module.exports = router;