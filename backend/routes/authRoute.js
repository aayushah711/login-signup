const express = require('express');
const router = express.Router();
const { getUserPhotos, registerUser, loginUser } = require('../controllers/userController');

router.get('/photos', getUserPhotos);

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;
