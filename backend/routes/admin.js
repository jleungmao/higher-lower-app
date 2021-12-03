const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getMain);



module.exports = router;