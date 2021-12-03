const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getMain);

router.post('/update-videos', adminController.updateVideos);


module.exports = router;