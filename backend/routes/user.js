const express = require('express');
const userController = require('../controllers/user.js');

const router = express.Router();

//GET 
router.get('/', userController.getMain);
router.get('/get-video', userController.getRandomVideo);
router.get('/search-channel', userController.searchChannel);

//POST
router.post('/add-channel', userController.addChannel);


module.exports = router;